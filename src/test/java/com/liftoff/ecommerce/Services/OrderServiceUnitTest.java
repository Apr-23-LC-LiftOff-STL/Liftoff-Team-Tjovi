package com.liftoff.ecommerce.Services;

import com.liftoff.ecommerce.Models.*;
import com.liftoff.ecommerce.Repositories.CompletedOrderRepository;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderServiceUnitTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private MovieRepository movieRepository;

    @Mock
    private CompletedOrderRepository completedOrderRepository;

    @InjectMocks
    private OrderService orderService;

    Customer testCustomer1;
    Customer testCustomer2;
    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;
    ShoppingCart testCart1;
    ShoppingCart testCart2;
    ShoppingCart testCart3;
    CompletedOrderItem testOrderItem1;
    CompletedOrderItem testOrderItem2;
    CompletedOrderItem testOrderItem3;
    CompletedOrder testOrder1;
    CompletedOrder testOrder2;

    @BeforeEach
    public void setUP(){
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
        testCart1.setTotalPrice(testMovie1.getPrice() * testCart1.getQuantity());
        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        testCart2.setTotalPrice(testMovie2.getPrice() * testCart2.getQuantity());
        testCart3 = new ShoppingCart(testMovie3.getId(), 3L);
        testCart3.setCustomer(testCustomer2);
        testCart3.setTotalPrice(testMovie3.getPrice() * testCart3.getQuantity());

        testOrderItem1 = new CompletedOrderItem(testOrder1, testCart1.getMovieId(), testMovie1.getTitle(),
                testCart1.getQuantity(), testCart1.getTotalPrice());
        testOrderItem2 = new CompletedOrderItem(testOrder1, testCart2.getMovieId(), testMovie2.getTitle(),
                testCart2.getQuantity(), testCart2.getTotalPrice());
        testOrderItem3 = new CompletedOrderItem(testOrder2, testCart3.getMovieId(), testMovie3.getTitle(),
                testCart3.getQuantity(), testCart3.getTotalPrice());

        testOrder1 = new CompletedOrder(testCustomer1, testCustomer1.getEmail());
        testOrder1.setTotalOrderQuantity(testOrderItem1.getQuantity() + testOrderItem2.getQuantity());
        testOrder1.setTotalOrderPrice((testOrderItem1.getTotalPrice() * testOrderItem1.getQuantity())
                +(testOrderItem2.getTotalPrice() * testOrderItem2.getQuantity()));
        testOrder2 = new CompletedOrder(testCustomer2, testCustomer2.getEmail());
        testOrder2.setTotalOrderQuantity(testOrderItem3.getQuantity());
        testOrder2.setTotalOrderPrice(testOrderItem3.getTotalPrice());
}



    @Test
    public void returnAllCompletedOrders(){
        List<CompletedOrder> allCompletedOrders = new ArrayList<>();
        allCompletedOrders.add(testOrder1);
        allCompletedOrders.add(testOrder2);

        when(completedOrderRepository.findAll()).thenReturn(allCompletedOrders);
        ResponseEntity<?> response = orderService.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allCompletedOrders));
    }

    @Test
    public void returnAllCompletedOrdersNotFound(){
        when(completedOrderRepository.findAll()).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = orderService.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
    }

    @Test
    public void returnAllCompletedOrdersById(){
        List<CompletedOrder> testCustomer1Orders = new ArrayList<>();
        testCustomer1Orders.add(testOrder1);

        when(completedOrderRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testCustomer1Orders);
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer1.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Orders));
    }

    @Test
    public void returnAllCompletedOrdersByIdNotFound(){
        when(completedOrderRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer1.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
    }


}

