package com.liftoff.ecommerce.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.CustomerService;
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

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(properties = {"spring.config.name=application-test"})
@Import(DatabaseTestConfiguration.class)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class ShoppingCartServiceIntegrationTest {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    Customer testCustomer1;
    Customer testCustomer2;

    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;

    ShoppingCart testCart1;
    ShoppingCart testCart2;
    ShoppingCart testCart3;

    @BeforeEach
    public void setup() {
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
        testCart1.setTotalPrice(testMovie1.getPrice());

        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        testCart2.setTotalPrice(testMovie2.getPrice()*2);

        testCart3 = new ShoppingCart(testMovie3.getId(), 3L);
        testCart3.setCustomer(testCustomer2);
        testCart3.setTotalPrice(testMovie3.getPrice()*3);
    }

    @Test
    public void testReturnAllCartsSuccess(){
        shoppingCartRepository.save(testCart1);
        shoppingCartRepository.save(testCart2);
        shoppingCartRepository.save(testCart3);

        ResponseEntity<?> response = shoppingCartService.returnAllCarts();
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        List<ShoppingCart> responseBody = (List<ShoppingCart>) response.getBody();
        assertThat(responseBody, hasSize(3));

        List<ShoppingCart> allTestCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        assertThat(allTestCarts, hasSize(3));

        for(int i=0; i<allTestCarts.size(); i++){
            assertThat(allTestCarts.get(i).getCartId(), is(responseBody.get(i).getCartId()));
            assertThat(allTestCarts.get(i).getCustomer().getId(), is(responseBody.get(i).getCustomer().getId()));
            assertThat(allTestCarts.get(i).getMovieId(), is(responseBody.get(i).getMovieId()));
            assertThat(allTestCarts.get(i).getQuantity(), is(responseBody.get(i).getQuantity()));
            assertThat(allTestCarts.get(i).getTotalPrice(), is(responseBody.get(i).getTotalPrice()));
        }
    }

    @Test
    public void testReturnAllCartsNotFound(){
        ResponseEntity<?> response = shoppingCartService.returnAllCarts();
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));

        List<ShoppingCart> allTestCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        assertThat(allTestCarts, is(empty()));
    }

    @Test
    public void testReturnCartsByCustomerIdSuccess(){
        shoppingCartRepository.save(testCart1);
        shoppingCartRepository.save(testCart2);
        shoppingCartRepository.save(testCart3);

        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        List<ShoppingCart> responseBody = (List<ShoppingCart>) response.getBody();

        List<ShoppingCart> testCustomerCarts = shoppingCartRepository.findByCustomerId(testCustomer1.getId());

        assertThat(responseBody, hasSize(2));
        assertThat(testCustomerCarts, hasSize(2));
        assertThat(testCustomerCarts.get(0).getCartId(), is(responseBody.get(0).getCartId()));
        assertThat(testCustomerCarts.get(1).getCartId(), is(responseBody.get(1).getCartId()));
        assertThat(testCustomerCarts.get(0).getCustomer().getId(), is(responseBody.get(0).getCustomer().getId()));
        assertThat(testCustomerCarts.get(1).getCustomer().getId(), is(responseBody.get(1).getCustomer().getId()));
    }

    @Test
    public void testReturnCartsByCustomerIdNotFound(){
        ResponseEntity<?> response = shoppingCartService.returnCartsByCustomerId(testCustomer1.getId());
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));

        List<ShoppingCart> allTestCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        assertThat(allTestCarts, is(empty()));
    }

    @Test
    public void testCreateNewShoppingCartSuccess(){
        ShoppingCart newCartToAdd = new ShoppingCart(testMovie3.getId(), 5L);

        ResponseEntity<?> response = shoppingCartService.createNewShoppingCart(testCustomer1, newCartToAdd);
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));

        List<ShoppingCart> allCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        ShoppingCart createdCart = allCarts.get(0);

        assertThat(allCarts, hasSize(1));
        assertThat(createdCart.getCartId(), is(1L));
        assertThat(createdCart.getCustomer().getId(), is(testCustomer1.getId()));
        assertThat(createdCart.getMovieId(), is(newCartToAdd.getMovieId()));
        assertThat(createdCart.getQuantity(), is(newCartToAdd.getQuantity()));
        assertThat(createdCart.getTotalPrice(), is(testMovie3.getPrice()*newCartToAdd.getQuantity()));
    }

    @Test
    public void testUpdateQuantityInCartSuccess(){
        shoppingCartRepository.save(testCart1);
        ShoppingCart cartToUpdate = new ShoppingCart(testMovie1.getId(), 4L);

        ResponseEntity<?> response = shoppingCartService.updateQuantityInCart(testCustomer1, cartToUpdate);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        List<ShoppingCart> allCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        ShoppingCart updatedCart = allCarts.get(0);

        assertThat(allCarts, hasSize(1));
        assertThat(updatedCart.getCustomer().getId(), is(testCustomer1.getId()));
        assertThat(updatedCart.getMovieId(), is(cartToUpdate.getMovieId()));
        assertThat(updatedCart.getQuantity(), is(cartToUpdate.getQuantity()));
        assertThat(updatedCart.getTotalPrice(), is(testMovie1.getPrice()*cartToUpdate.getQuantity()));
    }

    @Test
    public void testUpdateQuantityInCartNotFound(){
        ShoppingCart cartToUpdate = new ShoppingCart(testMovie1.getId(), 4L);

        ResponseEntity<?> response = shoppingCartService.updateQuantityInCart(testCustomer1, cartToUpdate);
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));

        List<ShoppingCart> allTestCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        assertThat(allTestCarts, is(empty()));
    }

    @Test
    public void testRemoveItemFromCustomerCartSuccess(){
        shoppingCartRepository.save(testCart1);
        shoppingCartRepository.save(testCart2);
        shoppingCartRepository.save(testCart3);
        ShoppingCart cartToRemove = new ShoppingCart(testCart1.getMovieId(), testCart1.getQuantity());

        ResponseEntity<?> response = shoppingCartService.removeItemFromCustomerCart(testCustomer1, cartToRemove);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        List<ShoppingCart> allCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();

        assertThat(allCarts, hasSize(2));
        assertThat(allCarts.get(0).getCartId(), is(testCart2.getCartId()));
        assertThat(allCarts.get(0).getCustomer().getId(), is(testCart2.getCustomer().getId()));
        assertThat(allCarts.get(0).getMovieId(), is(testCart2.getMovieId()));
        assertThat(allCarts.get(0). getTotalPrice(), is(testCart2.getTotalPrice()));
        assertThat(allCarts.get(1).getCartId(), is(testCart3.getCartId()));
        assertThat(allCarts.get(1).getCustomer().getId(), is(testCart3.getCustomer().getId()));
        assertThat(allCarts.get(1).getMovieId(), is(testCart3.getMovieId()));
        assertThat(allCarts.get(1). getTotalPrice(), is(testCart3.getTotalPrice()));
    }

    @Test
    public void testRemoveItemFromCustomerCartNotFound(){
        ShoppingCart cartToRemove = new ShoppingCart(testCart1.getMovieId(), testCart1.getQuantity());

        ResponseEntity<?> response = shoppingCartService.removeItemFromCustomerCart(testCustomer1, cartToRemove);
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));

        List<ShoppingCart> allTestCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        assertThat(allTestCarts, is(empty()));
    }

    @Test
    public void testRemoveAllItemsFromCartByCustomerSuccess(){
        shoppingCartRepository.save(testCart1);
        shoppingCartRepository.save(testCart2);
        shoppingCartRepository.save(testCart3);

        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        List<ShoppingCart> allCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();

        assertThat(allCarts, hasSize(1));
        assertThat(allCarts.get(0).getCartId(), is(testCart3.getCartId()));
        assertThat(allCarts.get(0).getCustomer().getId(), is(testCart3.getCustomer().getId()));
        assertThat(allCarts.get(0).getMovieId(), is(testCart3.getMovieId()));
        assertThat(allCarts.get(0). getTotalPrice(), is(testCart3.getTotalPrice()));
    }

    @Test
    public void testRemoveAllItemsFromCartByCustomerNotFound(){
        ResponseEntity<?> response = shoppingCartService.removeAllItemsFromCartByCustomer(testCustomer1);
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));

        List<ShoppingCart> allTestCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        assertThat(allTestCarts, is(empty()));
    }
}