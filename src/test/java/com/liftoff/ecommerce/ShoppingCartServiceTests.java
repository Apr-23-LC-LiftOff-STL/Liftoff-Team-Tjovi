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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
    ShoppingCart testCart2;
    ShoppingCart testCart3;
    ShoppingCart testCartWithNewQuantity;
    List<ShoppingCart> testShoppingCarts = new ArrayList<>();

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
        testShoppingCarts.add(testCart1);
        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        testShoppingCarts.add(testCart2);
        testCart3 = new ShoppingCart(testMovie3.getId(), 1L);
        testCart3.setCustomer(testCustomer2);
        testShoppingCarts.add(testCart3);

        testCartWithNewQuantity = new ShoppingCart(testMovie1.getId(), 10L);
    }

    @Test
    @Order(1)
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
    @Order(2)
    public void testReturnAllCarts(){
        when(shoppingCartRepository.findAll()).thenReturn(testShoppingCarts);
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        String specStatus = "The status code should be HttpStatus.OK";
        String specBody = "The returned response body shopping carts should match the expected list testShoppingCarts";

        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
        assertEquals(specBody, testShoppingCarts, response.getBody());
    }

    @Test
    @Order(3)
    public void testReturnAllCartsNotFound(){
        when(shoppingCartRepository.findAll()).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts associated with that user were found' for no shopping carts found";

        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(specBody, "No carts associated with that user were found", response.getBody());
    }

    @Test
    @Order(4)
    public void testReturnCartsByCustomerId(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testShoppingCarts);
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());

        String specStatus = "The status code should be HttpStatus.OK";
        String specBody = "The returned response body shopping carts should match the expected list testShoppingCarts";

        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());
        assertEquals(specBody, testShoppingCarts, response.getBody());
    }

    @Test
    @Order(5)
    public void testReturnCartsByCustomerIdNotFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());

        String specStatus = "The status code should be HttpStatus.NOT_FOUND";
        String specBody = "The response body should be 'No carts associated with that user were found' for no shopping carts found";

        assertEquals(specStatus, HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(specBody, "No carts associated with that user were found", response.getBody());
    }

    @Test
    @Order(6)
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
    @Order(7)
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
    @Order(9)
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
    @Order(10)
    public void testRemoveAllItemsFromCart(){
        when(shoppingCartRepository.findByCustomerId(testCustomer1.getId())).thenReturn(testShoppingCarts);

        ArgumentCaptor<List<ShoppingCart>> argumentCaptor = ArgumentCaptor.forClass(List.class);
        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCart(testCustomer1);

        verify(shoppingCartRepository, times(1)).findByCustomerId(testCustomer1.getId());

        verify(shoppingCartRepository, times(1)).deleteAll(argThat(carts -> {
            Set<Long> expectedCartIds = testShoppingCarts.stream()
                    .filter(cart -> cart.getCustomer().equals(testCustomer1))
                    .map(ShoppingCart::getCartId)
                    .collect(Collectors.toSet());
            Set<Long> actualCartIds = StreamSupport.stream(carts.spliterator(), false)
                    .map(ShoppingCart::getCartId)
                    .collect(Collectors.toSet());
        return actualCartIds.equals(expectedCartIds);
                }));

        String specStatus = "The status code should be HttpStatus.OK";
        assertEquals(specStatus, HttpStatus.OK, response.getStatusCode());

    }

}
