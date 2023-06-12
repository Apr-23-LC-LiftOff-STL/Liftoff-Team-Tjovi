package com.liftoff.ecommerce.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liftoff.ecommerce.Models.*;
import com.liftoff.ecommerce.Repositories.*;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import com.liftoff.ecommerce.config.DatabaseTestConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(properties = {"spring.config.name=application-test"})
@Import(DatabaseTestConfiguration.class)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class OrderServiceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CompletedOrderRepository completedOrderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CompletedOrderedItemRepository completedOrderedItemRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShoppingCartService shoppingCartService;

    CompletedOrder testOrder1;
    CompletedOrder testOrder2;

    Customer testCustomer1;
    Customer testCustomer2;
    Customer testCustomer3;

    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;

    CompletedOrderItem testOrderItem1;
    CompletedOrderItem testOrderItem2;
    CompletedOrderItem testOrderItem3;

    ShoppingCart testCart1;
    ShoppingCart testCart2;
    ShoppingCart testCart3;

    @BeforeEach
    void setUp() {
        testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        customerRepository.save(testCustomer1);
        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        customerRepository.save(testCustomer2);
        testCustomer3 = new Customer("Dianne", "Doe", "dianne@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        customerRepository.save(testCustomer3);

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        movieRepository.save(testMovie1);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        movieRepository.save(testMovie2);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
        movieRepository.save(testMovie3);

        // Create Order and Save
        testOrder1 = new CompletedOrder(testCustomer1, testCustomer1.getEmail());
        completedOrderRepository.save(testOrder1);
        //Create Cart 1 and Save
        testCart1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCart1.setCustomer(testCustomer1);
        testCart1.setTotalPrice(testMovie1.getPrice() * testCart1.getQuantity());
        shoppingCartRepository.save(testCart1);
        //Create Order Item 1 and save
        testOrderItem1 = new CompletedOrderItem(testOrder1, testCart1.getMovieId(), testMovie1.getTitle(),
                testCart1.getQuantity(), testCart1.getTotalPrice());
        completedOrderedItemRepository.save(testOrderItem1);
        //Create Cart 2 and Save
        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        testCart2.setTotalPrice(testMovie2.getPrice() * testCart2.getQuantity());
        shoppingCartRepository.save(testCart2);
        //Create Order Item 2 and save
        testOrderItem2 = new CompletedOrderItem(testOrder1, testCart2.getMovieId(), testMovie2.getTitle(),
                testCart2.getQuantity(), testCart2.getTotalPrice());
        completedOrderedItemRepository.save(testOrderItem2);
        //Set Order Quantity and Total Price
        testOrder1.setTotalOrderQuantity(testOrderItem1.getQuantity() + testOrderItem2.getQuantity());
        testOrder1.setTotalOrderPrice((testOrderItem1.getTotalPrice() * testOrderItem1.getQuantity())
                +(testOrderItem2.getTotalPrice() * testOrderItem2.getQuantity()));
        completedOrderRepository.save(testOrder1);

        testOrder2 = new CompletedOrder(testCustomer2, testCustomer2.getEmail());
        completedOrderRepository.save(testOrder2);
        testCart3 = new ShoppingCart(testMovie3.getId(), 3L);
        testCart3.setCustomer(testCustomer2);
        testCart3.setTotalPrice(testMovie3.getPrice() * testCart3.getQuantity());
        shoppingCartRepository.save(testCart3);
        testOrderItem3 = new CompletedOrderItem(testOrder2, testCart3.getMovieId(), testMovie3.getTitle(),
                testCart3.getQuantity(), testCart3.getTotalPrice());
        completedOrderedItemRepository.save(testOrderItem3);
        testOrder2.setTotalOrderQuantity(testOrderItem3.getQuantity());
        testOrder2.setTotalOrderPrice(testOrderItem3.getTotalPrice());
        completedOrderRepository.save(testOrder2);

    }

    @Test
    public void returnAllCompletedOrdersTest() throws Exception{
    List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) orderService.returnAllCompletedOrders().getBody();

    assertNotNull(allCompletedOrders);
    mockMvc.perform(get("/order/allOrdersHistory"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)));


    for (int i=0; i<allCompletedOrders.size(); i++){
        mockMvc.perform(get("/order/allOrdersHistory"))
            .andExpect(jsonPath("$[" + i + "].id", is((int)((long)allCompletedOrders.get(i).getId()))))
            .andExpect(jsonPath("$[" + i + "].email", is(allCompletedOrders.get(i).getCustomer().getEmail())))
            .andExpect(jsonPath("$[" + i + "].totalOrderQuantity", is((int)((long)allCompletedOrders.get(i).getTotalOrderQuantity()))))
            .andExpect(jsonPath("$[" + i + "].totalOrderPrice", is(allCompletedOrders.get(i).getTotalOrderPrice())))
            .andExpect(jsonPath("$[" + i + "].email", is(allCompletedOrders.get(i).getEmail())));
        }
    }

    @Test
    public void returnAllCompletedOrdersByCustomerIdTest() throws Exception{
        List<CompletedOrder> allCompletedOrdersByCustomerId = (List<CompletedOrder>) orderService.returnAllCompletedOrdersByCustomerId(testCustomer1.getId()).getBody();

        assertNotNull(allCompletedOrdersByCustomerId);
        mockMvc.perform(get("/order/history/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is((int)(long)testOrder1.getId())))
                .andExpect(jsonPath("$[0].email", is(testCustomer1.getEmail())))
                .andExpect(jsonPath("$[0].totalOrderQuantity", is((int)(long)testOrder1.getTotalOrderQuantity())))
                .andExpect(jsonPath("$[0].totalOrderPrice", is(testOrder1.getTotalOrderPrice())));
    }

    @Test
    public void returnMostRecentCompletedOrder() throws Exception{
        List<CompletedOrder> mostRecentCompletedOrderByCustomerId = (List<CompletedOrder>) orderService.returnMostRecentCompletedOrder(testCustomer2.getId()).getBody();

        assertNotNull(mostRecentCompletedOrderByCustomerId);
        mockMvc.perform(get("/order/currentPurchase/{email}", testCustomer2.getEmail()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is((int)(long)testOrder2.getId())))
                .andExpect(jsonPath("$[0].email", is(testCustomer2.getEmail())))
                .andExpect(jsonPath("$[0].totalOrderQuantity", is((int)(long)testOrder2.getTotalOrderQuantity())))
                .andExpect(jsonPath("$[0].totalOrderPrice", is(testOrder2.getTotalOrderPrice())));
    }

    @Test
    public void createNewOrderWithOneItemTest() throws Exception{
        ShoppingCart testCart4 = new ShoppingCart(testMovie3.getId(), 5L);
        testCart4.setCustomer(testCustomer3);
        testCart4.setTotalPrice(testMovie3.getPrice() * testCart4.getQuantity());
        shoppingCartRepository.save(testCart4);

        mockMvc.perform(post("/order/newOrder/{email}", testCustomer3.getEmail())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        List<CompletedOrder> allCompletedCustomer1Orders = completedOrderRepository.findByCustomerId(testCustomer3.getId());
        CompletedOrder savedOrder = allCompletedCustomer1Orders.get(0);

        //actual, expected
        assertThat(allCompletedCustomer1Orders, hasSize(1));
        assertThat(savedOrder.getTotalOrderQuantity(), is(testCart4.getQuantity()));
        assertThat(savedOrder.getId(), is(testOrder2.getId()+1));
        assertThat(savedOrder.getTotalOrderPrice(), is(testCart4.getTotalPrice()));
        assertThat(savedOrder.getEmail(), is(testCustomer3.getEmail()));
        assertThat(savedOrder.getCustomer().getId(), is(testCustomer3.getId()));

    }

//    @Test
//    public void createNewOrderWithMultipleItemsTest() throws Exception {
//
//    }
}