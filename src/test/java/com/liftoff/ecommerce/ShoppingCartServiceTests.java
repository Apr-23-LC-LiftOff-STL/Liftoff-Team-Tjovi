package com.liftoff.ecommerce;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@SpringBootTest(classes={ShoppingCartServiceTests.class})
public class ShoppingCartServiceTests {

    @Mock
    ShoppingCartRepository shoppingCartRepository;

    @InjectMocks
    ShoppingCartService shoppingCartService;

    Customer testCustomer1;
    Customer testCustomer2;
    Movie testMovie1;
    Movie testMovie2;
    ShoppingCart testCartReq1;
    ShoppingCart testCartReq2;
    List<ShoppingCart> testShoppingCarts = new ArrayList<>();

    @BeforeEach
    public void createTestData() {
        testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        testCustomer1.setId(100L);
        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "098-765-4321",
                "999 Broad St.", "1B", "New York", "NY", 99949L);
        testCustomer2.setId(101L);

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2022-06-05", "120", 9.99);
        testMovie1.setId(200L);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2023-06-05", "140", 8.99);
        testMovie2.setId(201L);

        testCartReq1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCartReq2 = new ShoppingCart(testMovie2.getId(), 2L);
        testShoppingCarts.add(testCartReq1);
        testShoppingCarts.add(testCartReq2);

    }

    @Test
    @Order(1)
    public void testReturnAllCarts(){
        when(shoppingCartRepository.findAll()).thenReturn(testShoppingCarts);

        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        assertEquals(null, HttpStatus.OK, response.getStatusCode());
        assertEquals(null, testShoppingCarts, response.getBody());
    }

    @Test
    @Order(2)
    public void testReturnCartInstances(){


    }

}
