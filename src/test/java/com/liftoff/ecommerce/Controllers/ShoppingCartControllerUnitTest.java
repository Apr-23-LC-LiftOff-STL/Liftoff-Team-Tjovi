package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ShoppingCartControllerUnitTest {

    @Mock
    private ShoppingCartService shoppingCartService;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private ShoppingCartController shoppingCartController;

    Customer testCustomer1;
    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;
    ShoppingCart testCart1;
    ShoppingCart testCart2;
    ShoppingCart requestedCart;
    List<ShoppingCart> testCustomer1Carts = new ArrayList<>();

    @BeforeEach
    public void createTestData() {
        MockitoAnnotations.openMocks(this);

        testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        testCustomer1.setId(100L);

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        testMovie1.setId(200L);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        testMovie2.setId(201L);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
        testMovie3.setId(202L);

        testCart1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCart1.setCustomer(testCustomer1);
        testCart1.setCartId(300L);
        testCustomer1Carts.add(testCart1);

        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        testCart2.setCartId(301L);
        testCustomer1Carts.add(testCart2);

        requestedCart = new ShoppingCart(testMovie1.getId(), 10L);
    }

    @Test
    public void testReturnAllCarts(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(testCustomer1Carts, HttpStatus.OK);
        when(shoppingCartService.returnAllCarts()).thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.returnAllCarts();

        String specStatus = "The status code should be HttpStatus.OK";
        String specBody = "The returned response body shopping carts should match the expected list testCustomer1Carts";

        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
        assertEquals(specBody, testCustomer1Carts, response.getBody());
        verify(shoppingCartService).returnAllCarts();
        verifyNoMoreInteractions(shoppingCartService);
    }

    @Test
    public void testReturnCartsByCustomer(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(testCustomer1Carts, HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.returnCartsByCustomerId(eq(testCustomer1.getId())))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.returnCartsByCustomer(testCustomer1.getEmail());

        String specStatus = "The status code should be HttpStatus.OK";
        String specBody = "The returned response body shopping carts should match the expected list testCustomer1Carts";

        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
        assertEquals(specBody, testCustomer1Carts, response.getBody());
        verify(customerService).findCustomer(eq(testCustomer1.getEmail()));
        verify(shoppingCartService).returnCartsByCustomerId(eq(testCustomer1.getId()));
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testAddToCart(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.CREATED);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.createNewShoppingCart(eq(testCustomer1), eq(requestedCart)))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.addToCart(testCustomer1.getEmail(), requestedCart);

        String specStatus = "The status code should be HttpStatus.CREATED";

        assertEquals(specStatus, expectedResponse, response);
        verify(customerService).findCustomer(eq(testCustomer1.getEmail()));
        verify(shoppingCartService).createNewShoppingCart(eq(testCustomer1),eq(requestedCart));
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testUpdateCartQuantity(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.updateQuantityInCart(eq(testCustomer1), eq(requestedCart)))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.updateCartQuantity(testCustomer1.getEmail(), requestedCart);

        String specStatus = "The status code should be HttpStatus.OK";

        assertEquals(specStatus, expectedResponse, response);
        verify(customerService).findCustomer(eq(testCustomer1.getEmail()));
        verify(shoppingCartService).updateQuantityInCart(eq(testCustomer1), eq(requestedCart));
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testRemoveItemFromCustomerCart(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.removeItemFromCustomerCart(eq(testCustomer1), eq(requestedCart)))
                .thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.removeItemFromCustomerCart(testCustomer1.getEmail(), requestedCart);

        String specStatus = "The status code should be HttpStatus.OK";

        assertEquals(specStatus, expectedResponse, response);
        verify(customerService).findCustomer(eq(testCustomer1.getEmail()));
        verify(shoppingCartService).removeItemFromCustomerCart(eq(testCustomer1), eq(requestedCart));
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testRemoveAllItemsFromCartByCustomer(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.removeAllItemsFromCartByCustomer(eq(testCustomer1))).thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.removeAllItemsFromCartByCustomer(testCustomer1.getEmail());

        String specStatus = "The status code should be HttpStatus.OK";

        assertEquals(specStatus, expectedResponse, response);
        verify(customerService).findCustomer(eq(testCustomer1.getEmail()));
        verify(shoppingCartService).removeAllItemsFromCartByCustomer(eq(testCustomer1));
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

}