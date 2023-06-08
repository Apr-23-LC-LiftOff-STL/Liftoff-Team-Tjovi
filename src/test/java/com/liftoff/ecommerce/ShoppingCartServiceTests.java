package com.liftoff.ecommerce;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.util.AssertionErrors.assertTrue;

@SpringBootTest(classes={ShoppingCartServiceTests.class})
public class ShoppingCartServiceTests {

    @Mock
    private ShoppingCartRepository shoppingCartRepository;

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private ShoppingCartService shoppingCartService;

    Customer testCustomer1;
    Customer testCustomer2;
    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;
    ShoppingCart testCart1;
    Long testCart1Id;
    ShoppingCart testCart2;
    ShoppingCart testCart3;
    ShoppingCart testCart4;
    ShoppingCart testCartWithNewQuantity;
    List<ShoppingCart> testShoppingCarts = new ArrayList<>();
    List<ShoppingCart> allShoppingCarts = new ArrayList<>();

    @BeforeEach
    public void createTestData() {
        MockitoAnnotations.openMocks(this);

        testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        testCustomer1.setId(100L);
        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "098-765-4321",
                "999 Broad St.", "1B", "New York", "NY", 99949L);
        testCustomer2.setId(101L);

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        testMovie1.setId(200L);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        testMovie2.setId(201L);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
        testMovie3.setId(202L);

        testCart1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCart1.setCustomer(testCustomer1);
        testCart1.setCartId(300L);
        testShoppingCarts.add(testCart1);
        testCart1Id = testCart1.getCartId();

        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        testCart2.setCartId(301L);
        testShoppingCarts.add(testCart2);

        testCart3 = new ShoppingCart(testMovie3.getId(), 1L);
        testCart3.setCustomer(testCustomer2);
        testCart3.setCartId(302L);
        allShoppingCarts.add(testCart3);

        testCart4 = new ShoppingCart(testMovie1.getId(), 2L);
        testCart4.setCustomer(testCustomer2);
        testCart4.setCartId(303L);
        allShoppingCarts.add(testCart4);

        allShoppingCarts.addAll(testShoppingCarts);

        testCartWithNewQuantity = new ShoppingCart(testMovie1.getId(), 10L);
    }

    @Test
    public void testSetTotalPrice(){
        when(movieRepository.findById(testCart1.getMovieId())).thenReturn(Optional.of(testMovie1));
        shoppingCartService.setTotalPrice(testCart1);
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testMovie1.getPrice() * testCart1.getQuantity()));

        String specTotalPrice = "When passed a shoppingCart object, the setTotalPrice method invoked in the " +
                "createNewShoppingCart method should return an accurate price to two decimal places";

        assertEquals(specTotalPrice, expectedTotalPrice, testCart1.getTotalPrice());
    }

    @Test
    public void testReturnAllCarts(){
        when(shoppingCartRepository.findAll()).thenReturn(testShoppingCarts);
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        String specStatus = "The status code should be HttpStatus.OK";
        String specBody = "The returned response body shopping carts should match the expected list testShoppingCarts";

        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
        assertEquals(specBody, testShoppingCarts, response.getBody());
    }

    @Test
    public void testReturnAllCartsNotFound(){
        when(shoppingCartRepository.findAll()).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts associated with that user were found' for no shopping carts found";

        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(specBody, "No carts associated with that user were found", response.getBody());
    }

    @Test
    public void testReturnCartsByCustomerId(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testShoppingCarts);
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());

        String specStatus = "The status code should be HttpStatus.OK";
        String specBody = "The returned response body shopping carts should match the expected list testShoppingCarts";

        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
        assertEquals(specBody, testShoppingCarts, response.getBody());
    }

    @Test
    public void testReturnCartsByCustomerIdNotFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts associated with that user were found' for no shopping carts found";

        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(specBody, "No carts associated with that user were found", response.getBody());
    }

    @Test
    public void testCreateNewShoppingCart(){
        when(movieRepository.findById(testCart1.getMovieId())).thenReturn(Optional.of(testMovie1));
        ResponseEntity<?> response = shoppingCartService.createNewShoppingCart(testCustomer1, testCart1);
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testMovie1.getPrice() * testCart1.getQuantity()));

        String specTotalPrice = "When passed a shoppingCart object, the setTotalPrice method invoked in the " +
                "createNewShoppingCart method should return an accurate price to two decimal places";
        String specStatus = "The status code should be HttpStatus.CREATED";

        assertEquals(specTotalPrice, expectedTotalPrice, testCart1.getTotalPrice());
        verify(shoppingCartRepository, times(1)).save(testCart1);
        assertEquals(specStatus, HttpStatus.CREATED, response.getStatusCode());
    }

    // Perhaps could be broke into multiple tests, but wanted to make sure it was updating quantity, setting total price,
    // and saving correctly the correct updated values.
    @Test
    public void testUpdateQuantityInCartUpdatesQuantityAndTotalPriceAndSaves(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testShoppingCarts);
        when(movieRepository.findById(testCart1.getMovieId())).thenReturn(Optional.of(testMovie1));
        ResponseEntity<?> response = shoppingCartService.updateQuantityInCart(testCustomer1, testCartWithNewQuantity);
        Optional<ShoppingCart> cartAfterUpdate = testShoppingCarts.stream()
                .filter(cart -> cart.getMovieId().equals(testCartWithNewQuantity.getMovieId()))
                .findFirst();
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testMovie1.getPrice() * testCart1.getQuantity()));

        String specUpdatedCartIsPresent = "The updated testCart1 should be present in the list";
        String specNewQuantity = "The quantity of testCart1 should now match the quantity in testCartWithNewQuantity";
        String specTotalPrice = "When passed a shoppingCart object, the setTotalPrice method invoked in the " +
                "updateQuantityInCart method should return an accurate price to two decimal places";
        String specStatus = "The status code should be HttpStatus.OK";

        assertTrue(specUpdatedCartIsPresent, cartAfterUpdate.isPresent());
        assertEquals(specNewQuantity, testCartWithNewQuantity.getQuantity(), cartAfterUpdate.get().getQuantity());
        assertEquals(specTotalPrice, expectedTotalPrice, testCart1.getTotalPrice());
        verify(shoppingCartRepository, times(1)).save(testCart1);
        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testUpdateQuantityInCartNotFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.updateQuantityInCart(testCustomer1, testCart1);

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts associated with that user were found' for no shopping carts found";

        verify(shoppingCartRepository, never()).save(any());
        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(specBody, "No carts associated with that user were found", response.getBody());

    }

    @Test
    public void testRemoveAllItemsFromCartByCustomerWhenCartsExist(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testShoppingCarts);
        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1);

        ArgumentCaptor<List<ShoppingCart>> argumentCaptor = ArgumentCaptor.forClass(List.class);
        verify(shoppingCartRepository, times(1)).findByCustomerId(testCustomer1.getId());
        verify(shoppingCartRepository, times(1)).deleteAll(argumentCaptor.capture());

        List<ShoppingCart> deletedCarts = argumentCaptor.getValue();
        assertThat(deletedCarts)
                .hasSize(2)
                .extracting(cart -> cart.getCustomer().getId())
                .containsOnly(testCustomer1.getId());


        String specStatus = "The status code should be HttpStatus.OK";
        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testRemoveAllItemsByCustomerFromCartWhenNoCartsFound() {
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1);

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";

        verify(shoppingCartRepository, never()).deleteAll(any());
        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testRemoveItemFromCartWhenCartExists() {
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testShoppingCarts);
        ResponseEntity<?> response = shoppingCartService.removeItemFromCart(testCustomer1, testCart1);

        verify(shoppingCartRepository, times(1)).findByCustomerId(testCustomer1.getId());
        ArgumentCaptor<Long> argumentCaptor = ArgumentCaptor.forClass(Long.class);
        verify(shoppingCartRepository, times(1)).deleteById(argumentCaptor.capture());

        Long deletedCartId = argumentCaptor.getValue();
        String specStatus = "The status code should be HttpStatus.OK";

//  This check to see if deletedCart was removed from Array list, is not explicitly necessary as it doesn't directly test
//  service method functionality or in any other way provide information about the service method not learned without it.
//  It does, however, provide an extra level of confidence in the test setup and help catch any inconsistencies between
//  the test data and the actual behavior of the service method
        if (deletedCartId != null) {
            testShoppingCarts.removeIf(cart -> cart.getCartId().equals(deletedCartId));
        }

        assertThat(testShoppingCarts)
                .hasSize(1)
                .extracting(ShoppingCart::getCartId)
                .doesNotContain(testCart1Id);
//
        assertEquals(null, testCart1Id, deletedCartId);
        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testRemoveItemFromCartWhenNoCartFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.removeItemFromCart(testCustomer1, testCart1);

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";

        verify(shoppingCartRepository, never()).deleteById(any());
        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
