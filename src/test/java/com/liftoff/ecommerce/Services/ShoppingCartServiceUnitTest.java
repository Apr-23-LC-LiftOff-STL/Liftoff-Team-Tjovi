package com.liftoff.ecommerce.Services;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.util.AssertionErrors.assertTrue;
import static org.hamcrest.MatcherAssert.assertThat;


@ExtendWith(MockitoExtension.class)
public class ShoppingCartServiceUnitTest {

    @Mock
    private ShoppingCartRepository shoppingCartRepository;

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private ShoppingCartService shoppingCartService;

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
    public void testSetTotalPrice(){
        when(movieRepository.findById(testCart1.getMovieId())).thenReturn(Optional.of(testMovie1));
        shoppingCartService.setTotalPrice(testCart1);
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testMovie1.getPrice() * testCart1.getQuantity()));

        String specTotalPrice = "When passed a shoppingCart object, the setTotalPrice method invoked in the " +
                "createNewShoppingCart method should return an accurate price to two decimal places";

        assertThat(specTotalPrice,expectedTotalPrice, is(testCart1.getTotalPrice()));
        verify(movieRepository).findById(testCart1.getMovieId());
        verifyNoMoreInteractions(movieRepository);
    }

    @Test
    public void testReturnAllCartsSuccess(){
        when(shoppingCartRepository.findAll()).thenReturn(testCustomer1Carts);
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Carts));
        verify(shoppingCartRepository).findAll();
        verifyNoMoreInteractions(shoppingCartRepository);
    }

    @Test
    public void testReturnAllCartsNotFound(){
        when(shoppingCartRepository.findAll()).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartRepository).findAll();
        verifyNoMoreInteractions(shoppingCartRepository);
    }

    @Test
    public void testReturnCartsByCustomerIdSuccess(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testCustomer1Carts);
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Carts));
        verify(shoppingCartRepository).findByCustomerId(testCustomer1.getId());
        verifyNoMoreInteractions(shoppingCartRepository);
    }

    @Test
    public void testReturnCartsByCustomerIdNotFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartRepository).findByCustomerId(testCustomer1.getId());
        verifyNoMoreInteractions(shoppingCartRepository);

    }

    @Test
    public void testCreateNewShoppingCart(){
        when(movieRepository.findById(testCart1.getMovieId())).thenReturn(Optional.of(testMovie1));
        ResponseEntity<?> response = shoppingCartService.createNewShoppingCart(testCustomer1, requestedCart);
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testMovie1.getPrice() * requestedCart.getQuantity()));

        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(response.getBody(), nullValue());
        assertThat(requestedCart.getTotalPrice(), is(expectedTotalPrice));
        verify(movieRepository).findById(testCart1.getMovieId());
        verify(shoppingCartRepository).save(requestedCart);
        verifyNoMoreInteractions(movieRepository);
        verifyNoMoreInteractions(shoppingCartRepository);

    }

    // Perhaps could be broke into multiple tests, but wanted to make sure it was updating quantity, setting total price,
    // and saving correctly the correct updated values.
    @Test
    public void testUpdateQuantityInCartUpdatesQuantityAndTotalPriceAndSaves(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testCustomer1Carts);
        when(movieRepository.findById(testCart1.getMovieId())).thenReturn(Optional.of(testMovie1));
        ResponseEntity<?> response = shoppingCartService.updateQuantityInCart(testCustomer1, requestedCart);
        Optional<ShoppingCart> cartAfterUpdate = testCustomer1Carts.stream()
                .filter(cart -> cart.getMovieId().equals(requestedCart.getMovieId()))
                .findFirst();
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testMovie1.getPrice() * testCart1.getQuantity()));

        String specUpdatedCartIsPresent = "The updated testCart1 should be present in the list";
        String specNewQuantity = "The quantity of testCart1 should now match the quantity in testCartWithNewQuantity";
        String specTotalPrice = "When passed a shoppingCart object, the setTotalPrice method invoked in the " +
                "updateQuantityInCart method should return an accurate price to two decimal places";
        String specStatus = "The status code should be HttpStatus.OK";

        assertTrue(specUpdatedCartIsPresent, cartAfterUpdate.isPresent());
        assertEquals(specNewQuantity, requestedCart.getQuantity(), cartAfterUpdate.get().getQuantity());
        assertEquals(specTotalPrice, expectedTotalPrice, testCart1.getTotalPrice());
        verify(shoppingCartRepository, times(1)).save(testCart1);
        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdateQuantityInCartNotFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.updateQuantityInCart(testCustomer1, testCart1);

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts matching your criteria were found' for no shopping carts found";

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartRepository).findByCustomerId(testCustomer1.getId());
        verify(shoppingCartRepository, never()).save(any());
        verifyNoMoreInteractions(shoppingCartRepository);
    }

    @Test
    public void testRemoveAllItemsFromCartByCustomerWhenCartsExist(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testCustomer1Carts);
        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        verify(shoppingCartRepository).findByCustomerId(testCustomer1.getId());
        verify(shoppingCartRepository).deleteAll(testCustomer1Carts);
        verifyNoMoreInteractions(shoppingCartRepository);

//        ArgumentCaptor<List<ShoppingCart>> argumentCaptor = ArgumentCaptor.forClass(List.class);
//        verify(shoppingCartRepository, times(1)).findByCustomerId(testCustomer1.getId());
//        verify(shoppingCartRepository, times(1)).deleteAll(argumentCaptor.capture());

//        List<ShoppingCart> deletedCarts = argumentCaptor.getValue();
//        assertThat(deletedCarts)
//                .hasSize(2)
//                .extracting(cart -> cart.getCustomer().getId())
//                .containsOnly(testCustomer1.getId());

//
//        String specStatus = "The status code should be HttpStatus.OK";
//        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testRemoveAllItemsByCustomerFromCartWhenNoCartsFound() {
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1);

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartRepository, never()).deleteAll(any());
        verifyNoMoreInteractions(shoppingCartRepository);
    }

    @Test
    public void testRemoveItemFromCustomerCartWhenCartExists() {
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testCustomer1Carts);
        ResponseEntity<?> response = shoppingCartService.removeItemFromCustomerCart(testCustomer1, testCart1);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        verify(shoppingCartRepository).findByCustomerId(testCustomer1.getId());
        verify(shoppingCartRepository).deleteById(testCart1.getCartId());
        verifyNoMoreInteractions(shoppingCartRepository);
//        verify(shoppingCartRepository, times(1)).findByCustomerId(testCustomer1.getId());
//        ArgumentCaptor<Long> argumentCaptor = ArgumentCaptor.forClass(Long.class);
//        verify(shoppingCartRepository, times(1)).deleteById(argumentCaptor.capture());

//        Long deletedCartId = argumentCaptor.getValue();
//        String specStatus = "The status code should be HttpStatus.OK";

//  This check to see if deletedCart was removed from Array list, is not explicitly necessary as it doesn't directly test
//  service method functionality or in any other way provide information about the service method not learned without it.
//  It does, however, provide an extra level of confidence in the test setup and help catch any inconsistencies between
//  the test data and the actual behavior of the service method
//        if (deletedCartId != null) {
//            testCustomer1Carts.removeIf(cart -> cart.getCartId().equals(deletedCartId));
//        }
//
//        assertThat(testCustomer1Carts)
//                .hasSize(1)
//                .extracting(ShoppingCart::getCartId)
//                .doesNotContain(testCart1.getCartId());
////
//        assertEquals(null, testCart1.getCartId(), deletedCartId);
//        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testRemoveItemFromCustomerCartWhenNoCartFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.removeItemFromCustomerCart(testCustomer1, testCart1);

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts matching your criteria were found' for no shopping carts found";

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartRepository, never()).deleteById(any());
        verifyNoMoreInteractions(shoppingCartRepository);
    }
}
