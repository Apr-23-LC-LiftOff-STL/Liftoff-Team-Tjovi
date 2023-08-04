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

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
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
    public void testReturnAllCartsSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(testCustomer1Carts, HttpStatus.OK);
        when(shoppingCartService.returnAllCarts()).thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.returnAllCarts();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Carts));
        verify(shoppingCartService).returnAllCarts();
        verifyNoMoreInteractions(shoppingCartService);
    }

    @Test
    public void testReturnAllCartsNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);
        when(shoppingCartService.returnAllCarts()).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.returnAllCarts();

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartService).returnAllCarts();
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testReturnCartsByCustomerSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(testCustomer1Carts, HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.returnCartsByCustomerId(eq(testCustomer1.getId())))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.returnCartsByCustomer(testCustomer1.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Carts));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).returnCartsByCustomerId(testCustomer1.getId());
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testReturnCartsByCustomerCartNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.returnCartsByCustomerId(testCustomer1.getId())).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.returnCartsByCustomer(testCustomer1.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).returnCartsByCustomerId(testCustomer1.getId());
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testAddToCartSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.CREATED);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.createNewShoppingCart(testCustomer1, requestedCart))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.addToCart(testCustomer1.getEmail(), requestedCart);

        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).createNewShoppingCart(testCustomer1, requestedCart);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testAddToCartNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.createNewShoppingCart(testCustomer1, requestedCart)).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.addToCart(testCustomer1.getEmail(), requestedCart);

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).createNewShoppingCart(testCustomer1, requestedCart);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testUpdateCartQuantitySuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.updateQuantityInCart(testCustomer1, requestedCart))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.updateCartQuantity(testCustomer1.getEmail(), requestedCart);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).updateQuantityInCart(testCustomer1, requestedCart);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testUpdateCartQuantityNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.updateQuantityInCart(eq(testCustomer1), eq(requestedCart)))
                .thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = shoppingCartController.updateCartQuantity(testCustomer1.getEmail(), requestedCart);

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).updateQuantityInCart(testCustomer1, requestedCart);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testRemoveItemFromCustomerCartSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.removeItemFromCustomerCart(eq(testCustomer1), eq(requestedCart)))
                .thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.removeItemFromCustomerCart(testCustomer1.getEmail(), requestedCart);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).removeItemFromCustomerCart(testCustomer1, requestedCart);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testRemoveItemFromCustomerCartNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.removeItemFromCustomerCart(eq(testCustomer1), eq(requestedCart)))
                .thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.removeItemFromCustomerCart(testCustomer1.getEmail(), requestedCart);

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).removeItemFromCustomerCart(testCustomer1, requestedCart);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testRemoveAllItemsFromCartByCustomerSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.OK);
        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.removeAllItemsFromCartByCustomer(eq(testCustomer1))).thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.removeAllItemsFromCartByCustomer(testCustomer1.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        verify(customerService).findCustomer(eq(testCustomer1.getEmail()));
        verify(shoppingCartService).removeAllItemsFromCartByCustomer(eq(testCustomer1));
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

    @Test
    public void testRemoveAllItemsFromCartByCustomerCartNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);

        when(customerService.findCustomer(testCustomer1.getEmail())).thenReturn(testCustomer1);
        when(shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1)).thenAnswer(invocation->expectedResponse);

        ResponseEntity<?> response = shoppingCartController.removeAllItemsFromCartByCustomer(testCustomer1.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer1.getEmail());
        verify(shoppingCartService).removeAllItemsFromCartByCustomer(testCustomer1);
        verifyNoMoreInteractions(customerService, shoppingCartService);
    }

}