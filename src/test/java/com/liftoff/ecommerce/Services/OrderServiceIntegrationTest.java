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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
    CompletedOrder testOrder3;
    Customer testCustomer1;
    Customer testCustomer2;
    Movie testMovie1;
    Movie testMovie2;
    ShoppingCart testCart1;
    ShoppingCart testCart2;
    ShoppingCart testCart3;
    CompletedOrderItem orderItem1;
    CompletedOrderItem orderItem2;

    @BeforeEach
    void setUp() {
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
    public void testSetTotalOrderPriceSuccess() throws Exception {
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);
        orderItem1 = new CompletedOrderItem(testOrder3, testCart1.getMovieId(), testMovie1.getTitle(),
                                            testCart1.getQuantity(), testCart1.getTotalPrice());
        orderItem2 = new CompletedOrderItem(testOrder3, testCart2.getMovieId(), testMovie2.getTitle(),
                testCart2.getQuantity(), testCart2.getTotalPrice());
        completedOrderedItemRepository.save(orderItem1);
        completedOrderedItemRepository.save(orderItem2);

        orderService.setTotalOrderPrice(testOrder3);

        assertThat(testOrder3.getTotalOrderPrice(), is(testCart1.getTotalPrice() + testCart2.getTotalPrice()));
    }

    @Test
    public void testSetTotalOrderPriceMovieNotFoundRuntimeException() throws Exception {
        completedOrderRepository.save(testOrder1);

        assertThrows(RuntimeException.class, () -> orderService.setTotalOrderPrice(testOrder1), "Order items not found");
    }

    @Test
    public void testCreateNewOrderSuccess() throws Exception {
        ResponseEntity<?> response = orderService.createNewOrder(testCustomer2);
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));

        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) completedOrderRepository.findAll();
        CompletedOrder newCompletedOrder = allCompletedOrders.get(0);

        assertThat(allCompletedOrders, hasSize(1));
        assertThat(newCompletedOrder.getId(), is(1L));
        assertThat(newCompletedOrder.getCustomer().getId(), is(testCustomer2.getId()));
        assertThat(newCompletedOrder.getEmail(), is(testCustomer2.getEmail()));
        assertThat(newCompletedOrder.getTotalOrderQuantity(), is(testCart1.getQuantity() + testCart2.getQuantity()));
        assertThat(newCompletedOrder.getTotalOrderPrice(), is(testCart1.getTotalPrice() + testCart2.getTotalPrice()));
    }

    @Test
    public void testCreateNewOrderCartNotFound() throws Exception{
        ResponseEntity<?> response = orderService.createNewOrder(testCustomer1);
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));

        List<CompletedOrder> allCustomer1Orders = (List<CompletedOrder>) completedOrderRepository.findByCustomerId(testCustomer1.getId());
        assertThat(allCustomer1Orders, is(empty()));
    }

    @Test
    public void testCreateNewOrderMovieNotFoundRuntimeException() throws Exception {
        testCart3 = new ShoppingCart(3L, 1L);
        testCart3.setCustomer(testCustomer1);
        shoppingCartRepository.save(testCart3);

        assertThrows(RuntimeException.class, () -> orderService.createNewOrder(testCustomer1), "No movies matching your criteria were found");
    }

    @Test
    public void testReturnAllCompletedOrdersSuccess() throws Exception{
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        ResponseEntity<?> response = orderService.returnAllCompletedOrders();
        List<CompletedOrder> responseBody = (List<CompletedOrder>) response.getBody();
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(responseBody, hasSize(3));

        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) completedOrderRepository.findAll();
        assertThat(allCompletedOrders, hasSize(3));

        for(int i=0; i<allCompletedOrders.size(); i++){
            assertThat(allCompletedOrders.get(i).getId(), is(responseBody.get(i).getId()));
            assertThat(allCompletedOrders.get(i).getCustomer().getId(), is(responseBody.get(i).getCustomer().getId()));
            assertThat(allCompletedOrders.get(i).getEmail(), is(responseBody.get(i).getEmail()));
            assertThat(allCompletedOrders.get(i).getTotalOrderQuantity(), is(responseBody.get(i).getTotalOrderQuantity()));
            assertThat(allCompletedOrders.get(i).getTotalOrderPrice(), is(responseBody.get(i).getTotalOrderPrice()));
        }
    }

    @Test
    public void TestReturnAllCompletedOrdersNotFound() throws Exception{
        ResponseEntity<?> response = orderService.returnAllCompletedOrders();
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));

        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) completedOrderRepository.findAll();
        assertThat(allCompletedOrders, is(empty()));
    }

    @Test
    public void TestReturnAllCompletedOrdersByCustomerIdSuccess() throws Exception{
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer1.getId());
        List<CompletedOrder> responseBody = (List<CompletedOrder>) response.getBody();
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(responseBody, hasSize(2));

        List<CompletedOrder> allCustomer1Orders = (List<CompletedOrder>) completedOrderRepository.findByCustomerId(testCustomer1.getId());
        assertThat(allCustomer1Orders, hasSize(2));

        for(int i=0; i<allCustomer1Orders.size(); i++){
            assertThat(allCustomer1Orders.get(i).getId(), is(responseBody.get(i).getId()));
            assertThat(allCustomer1Orders.get(i).getCustomer().getId(), is(responseBody.get(i).getCustomer().getId()));
            assertThat(allCustomer1Orders.get(i).getEmail(), is(responseBody.get(i).getEmail()));
            assertThat(allCustomer1Orders.get(i).getTotalOrderQuantity(), is(responseBody.get(i).getTotalOrderQuantity()));
            assertThat(allCustomer1Orders.get(i).getTotalOrderPrice(), is(responseBody.get(i).getTotalOrderPrice()));
        }
    }

    @Test
    public void TestReturnAllCompletedOrdersByCustomerIdOrdersNotFound() throws Exception{
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testOrder1.getId());
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));

        List<CompletedOrder> allCustomer1Orders = (List<CompletedOrder>) completedOrderRepository.findByCustomerId(testCustomer1.getId());
        assertThat(allCustomer1Orders, is(empty()));
    }

    @Test
    public void TestReturnMostRecentCompletedOrderSuccess() throws Exception{
        completedOrderRepository.save(testOrder1);
        completedOrderRepository.save(testOrder2);
        completedOrderRepository.save(testOrder3);

        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testOrder1.getId());
        CompletedOrder responseBody = (CompletedOrder) response.getBody();
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        List<CompletedOrder> allCustomer1Orders = completedOrderRepository.findByCustomerId(testCustomer1.getId());
        CompletedOrder mostRecentCustomer1Order = allCustomer1Orders.get(allCustomer1Orders.size()-1);
        assertThat(allCustomer1Orders, hasSize(2));
        assertThat(mostRecentCustomer1Order.getId(), is(responseBody.getId()));
        assertThat(mostRecentCustomer1Order.getCustomer().getId(), is(responseBody.getCustomer().getId()));
        assertThat(mostRecentCustomer1Order.getEmail(), is(responseBody.getEmail()));
        assertThat(mostRecentCustomer1Order.getTotalOrderQuantity(), is(responseBody.getTotalOrderQuantity()));
        assertThat(mostRecentCustomer1Order.getTotalOrderPrice(), is(responseBody.getTotalOrderPrice()));

    }

    @Test
    public void TestReturnMostRecentCompletedOrderNotFound() throws Exception{
        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testOrder1.getId());
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));

        List<CompletedOrder> allCustomer1Orders = (List<CompletedOrder>) completedOrderRepository.findByCustomerId(testCustomer1.getId());
        assertThat(allCustomer1Orders, is(empty()));
    }
}