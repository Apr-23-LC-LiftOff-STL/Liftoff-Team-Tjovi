package com.liftoff.ecommerce.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liftoff.ecommerce.Models.CompletedOrder;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.*;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.config.DatabaseTestConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {"spring.config.name=application-test"})
@AutoConfigureMockMvc
@Import(DatabaseTestConfiguration.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class OrderControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CompletedOrderRepository completedOrderRepository;

    @Autowired
    private CompletedOrderedItemRepository completedOrderedItemRepository;

    @Autowired
    private ObjectMapper objectMapper;

    Customer testCustomer1;
    Customer testCustomer2;
    CompletedOrder testOrder1;
    CompletedOrder testOrder2;
    CompletedOrder testOrder3;
    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;
    ShoppingCart testCart1;
    ShoppingCart testCart2;
    ShoppingCart testCart3;

    @BeforeEach
    public void setup() {
        testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        customerRepository.save(testCustomer1);
        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        customerRepository.save(testCustomer2);

        testOrder1 = new CompletedOrder(testCustomer1, testCustomer1.getEmail());
        testOrder2 = new CompletedOrder(testCustomer1, testCustomer1.getEmail());
        testOrder3 = new CompletedOrder(testCustomer2, testCustomer2.getEmail());

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        movieRepository.save(testMovie1);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        movieRepository.save(testMovie2);
//        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
//        movieRepository.save(testMovie3);

        testCart1 = new ShoppingCart(testMovie1.getId(), 5L);
        testCart1.setCustomer(testCustomer2);
        testCart1.setTotalPrice(testMovie1.getPrice() * testCart1.getQuantity());
        shoppingCartRepository.save(testCart1);

        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer2);
        testCart2.setTotalPrice(testMovie2.getPrice() * testCart2.getQuantity());
        shoppingCartRepository.save(testCart2);
    }

    @Test
    public void testCreateNewOrderSuccess() throws Exception {
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        mockMvc.perform(post("/order/newOrder/{email}", testCustomer2.getEmail()))
                .andDo(print())
                .andExpect(status().isCreated());

        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) completedOrderRepository.findAll();
        CompletedOrder newOrder = allCompletedOrders.get(3);
        Double expectedPrice = testCart1.getTotalPrice() + testCart2.getTotalPrice();

        assertThat(allCompletedOrders, hasSize(4));
        assertThat(newOrder.getId(), is(4L));
        assertThat(newOrder.getCustomer().getId(), is(testCustomer2.getId()));
        assertThat(newOrder.getEmail(), is(testCustomer2.getEmail()));
        assertThat(newOrder.getCompletedOrderItems(), hasSize(2));
        assertThat(newOrder.getTotalOrderQuantity(), is(testCart1.getQuantity() + testCart2.getQuantity()));
        assertThat(newOrder.getTotalOrderPrice(), is(expectedPrice));
    }

    @Test
    public void testCreateNewOrderCartNotFound() throws Exception {
        ResponseEntity<?> response = orderService.createNewOrder(testCustomer1);

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        mockMvc.perform(post("/order/newOrder/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("No carts matching your criteria were found")));
    }

    @Test
    public void testCreateNewOrderMovieNotFoundRuntimeException() throws Exception {
        testCart3 = new ShoppingCart(3L, 1L);
        testCart3.setCustomer(testCustomer1);
        shoppingCartRepository.save(testCart3);

        assertThrows(RuntimeException.class, () -> orderService.createNewOrder(testCustomer1), "No movies matching your criteria were found");
        mockMvc.perform(post("/order/newOrder/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testReturnAllCompletedOrdersSuccess() throws Exception {
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        ResponseEntity<?> response = orderService.returnAllCompletedOrders();
        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) response.getBody();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(allCompletedOrders, hasSize(3));
        mockMvc.perform(get("/order/allOrdersHistory"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));

        for(int i=0; i<allCompletedOrders.size(); i++){
            mockMvc.perform(get("/order/allOrdersHistory"))
                    .andExpect(jsonPath("$[" + i + "].id", is((int) (long) allCompletedOrders.get(i).getId())))
                    .andExpect(jsonPath("$[" + i + "].email", is(allCompletedOrders.get(i).getEmail())));
        }
    }

    @Test
    public void testReturnAllCompletedOrdersNotFound() throws Exception {
        ResponseEntity<?> response = orderService.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        mockMvc.perform(get("/order/allOrdersHistory"))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("No orders matching your criteria were found")));
    }

    @Test
    public void testReturnAllCompletedOrdersByCustomerIdSuccess() throws Exception {
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer1.getId());
        List<CompletedOrder> allCustomer1CompletedOrders = (List<CompletedOrder>) response.getBody();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(allCustomer1CompletedOrders, hasSize(2));
        mockMvc.perform(get("/order/history/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));

        for(int i=0; i<allCustomer1CompletedOrders.size(); i++){
            mockMvc.perform(get("/order/history/{email}", testCustomer1.getEmail()))
                    .andExpect(jsonPath("$[" + i + "].id", is((int) (long) allCustomer1CompletedOrders.get(i).getId())))
                    .andExpect(jsonPath("$[" + i + "].email", is(allCustomer1CompletedOrders.get(i).getEmail())));

            assertThat(allCustomer1CompletedOrders.get(0).getCustomer().getId(), is(testCustomer1.getId()));
            assertThat(allCustomer1CompletedOrders.get(1).getCustomer().getId(), is(testCustomer1.getId()));
        }
    }

    @Test
    public void testReturnAllCompletedOrdersByCustomerIdOrdersNotFound() throws Exception {
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer1.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        mockMvc.perform(get("/order/history/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("No orders matching your criteria were found")));
    }

    @Test
    public void testReturnMostRecentCompletedOrderSuccess() throws Exception {
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testCustomer1.getId());
        CompletedOrder mostRecentCustomer1Order = (CompletedOrder) response.getBody();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(mostRecentCustomer1Order, notNullValue());
        mockMvc.perform(get("/order/currentPurchase/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is((int) (long) mostRecentCustomer1Order.getId())))
                .andExpect(jsonPath("$.email", is(mostRecentCustomer1Order.getEmail())));

        assertThat(mostRecentCustomer1Order.getCustomer().getId(), is(testCustomer1.getId()));
    }

    @Test
    public void testReturnMostRecentCompletedOrderNotFound() throws Exception {
        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testCustomer1.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        mockMvc.perform(get("/order/currentPurchase/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("No orders matching your criteria were found")));
    }

}