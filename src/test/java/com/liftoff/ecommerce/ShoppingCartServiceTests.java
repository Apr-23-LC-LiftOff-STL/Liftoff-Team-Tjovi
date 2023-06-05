package com.liftoff.ecommerce;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;

import org.junit.Before;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@SpringBootTest(classes={ShoppingCartServiceTests.class})
public class ShoppingCartServiceTests {

    @Mock
    private ShoppingCartRepository shoppingCartRepository;

    @InjectMocks
    private ShoppingCartService shoppingCartService;

    private List<ShoppingCart> testShoppingCarts;

    private ShoppingCart testCartReq1;
    private ShoppingCart testCartReq2;


    @Before
    public void createTestData() {
        Customer testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        testCustomer1.setId(100L);
        Customer testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "098-765-4321",
                "999 Broad St.", "1B", "New York", "NY", 99949L);
        testCustomer2.setId(101L);

        Movie testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2022-06-05", "120", 9.99);
        testMovie1.setId(200L);
        Movie testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2023-06-05", "140", 8.99);
        testMovie2.setId(201L);

        testCartReq1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCartReq2 = new ShoppingCart(testMovie2.getId(), 2L);
    }

    @Test
    @Order(1)
    public void testReturnAllCarts(){


        when(shoppingCartRepository.findAll())
                .thenReturn(testShoppingCarts);

        System.out.println(testShoppingCarts);
        assertEquals(null,2, testShoppingCarts.size());



    }

    @Test
    @Order(2)
    public void testFindCustomer(){


    }

}
