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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    CompletedOrder testOrder1;
    CompletedOrder testOrder2;

    Customer testCustomer1;
    Customer testCustomer2;

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

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        movieRepository.save(testMovie1);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        movieRepository.save(testMovie2);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
        movieRepository.save(testMovie3);

        testCart1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCart1.setCustomer(testCustomer1);
        shoppingCartRepository.save(testCart1);

        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        shoppingCartRepository.save(testCart2);

        testCart3 = new ShoppingCart(testMovie3.getId(), 3L);
        testCart3.setCustomer(testCustomer2);
        shoppingCartRepository.save(testCart3);

        testOrder1 = new CompletedOrder(testCustomer1, testCustomer1.getEmail());
        testOrder1.setTotalOrderQuantity(testOrderItem1.getQuantity() + testOrderItem2.getQuantity());
        testOrder1.setTotalOrderPrice((testOrderItem1.getTotalPrice() * testOrderItem1.getQuantity())
                +(testOrderItem2.getTotalPrice() * testOrderItem2.getQuantity()));
        completedOrderRepository.save(testOrder1);

        testOrder2 = new CompletedOrder(testCustomer2, testCustomer2.getEmail());
        testOrder2.setTotalOrderQuantity(testOrderItem3.getQuantity());
        testOrder2.setTotalOrderPrice(testOrderItem3.getTotalPrice());
        completedOrderRepository.save(testOrder2);

        testOrderItem1 = new CompletedOrderItem(testOrder1, testCart1.getMovieId(), testMovie1.getTitle(),
               testCart1.getQuantity() , testMovie1.getPrice());
        completedOrderedItemRepository.save(testOrderItem1);

        testOrderItem2 = new CompletedOrderItem(testOrder1, testCart2.getMovieId(), testMovie2.getTitle(),
                testCart2.getQuantity(), testMovie2.getPrice());
        completedOrderedItemRepository.save(testOrderItem2);

        testOrderItem3 = new CompletedOrderItem(testOrder2, testCart3.getMovieId(), testMovie3.getTitle(),
                testCart3.getQuantity(), testMovie2.getPrice());
        completedOrderedItemRepository.save(testOrderItem3);


    }

    @Test
    public void returnAllCompletedOrdersTest() throws Exception{
    List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) orderService.returnAllCompletedOrders().getBody();

    assert allCompletedOrders != null;
    mockMvc.perform(get())
    }

}