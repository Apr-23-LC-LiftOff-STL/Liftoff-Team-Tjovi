package com.liftoff.ecommerce.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.config.DatabaseTestConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
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
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
        shoppingCartRepository.save(testCart1);

        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer1);
        shoppingCartRepository.save(testCart2);

        testCart3 = new ShoppingCart(testMovie3.getId(), 3L);
        testCart3.setCustomer(testCustomer2);
        shoppingCartRepository.save(testCart3);
    }

    @Test
    public void returnAllCartsTest() throws Exception{
        List<ShoppingCart> allShoppingCarts = (List<ShoppingCart>) shoppingCartService.returnAllCarts().getBody();

        assert allShoppingCarts != null;
        mockMvc.perform(get("/cart/returnAllCarts"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));

        for(int i=0; i<allShoppingCarts.size(); i++){
            mockMvc.perform(get("/cart/returnAllCarts"))
                    .andExpect(jsonPath("$[" + i + "].cartId", is((int)((long)allShoppingCarts.get(i).getCartId()))))
                    .andExpect(jsonPath("$[" + i + "].movieId", is((int)((long)allShoppingCarts.get(i).getMovieId()))))
                    .andExpect(jsonPath("$[" + i + "].quantity", is((int)((long)allShoppingCarts.get(i).getQuantity()))))
                    .andExpect(jsonPath("$[" + i + "].totalPrice", is(allShoppingCarts.get(i).getTotalPrice())));
        }
    }

    @Test
    public void returnCartsByCustomerIdTest() throws Exception {
        List<ShoppingCart> allShoppingCartsByCustomer = (List<ShoppingCart>) shoppingCartService.returnCartsByCustomerId(testCustomer1.getId()).getBody();

        assert allShoppingCartsByCustomer !=null;
        mockMvc.perform(get("/cart/returnAll/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));

        assertThat(allShoppingCartsByCustomer, hasSize(2));
        for(int i=0; i<allShoppingCartsByCustomer.size(); i++){
            mockMvc.perform(get("/cart/returnAll/{email}", testCustomer1.getEmail()))
                    .andExpect(jsonPath("$[" + i + "].customer.id", is((int)((long)testCustomer1.getId()))))
                    .andExpect(jsonPath("$[" + i + "].cartId", is((int)((long)allShoppingCartsByCustomer.get(i).getCartId()))))
                    .andExpect(jsonPath("$[" + i + "].movieId", is((int)((long)allShoppingCartsByCustomer.get(i).getMovieId()))))
                    .andExpect(jsonPath("$[" + i + "].quantity", is((int)((long)allShoppingCartsByCustomer.get(i).getQuantity()))))
                    .andExpect(jsonPath("$[" + i + "].totalPrice", is(allShoppingCartsByCustomer.get(i).getTotalPrice())));
        }
    }

    @Test
    public void createNewShoppingCartTest() throws Exception{
        ShoppingCart newCartToAdd = new ShoppingCart(testMovie3.getId(), 5L);

        mockMvc.perform(post("/cart/add/{email}", testCustomer1.getEmail())
                .content(objectMapper.writeValueAsString(newCartToAdd))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        List<ShoppingCart> allCustomerCarts = shoppingCartRepository.findByCustomerId(testCustomer1.getId());
        ShoppingCart addedCart = allCustomerCarts.get(2);
        Double expectedPrice = testMovie3.getPrice() * 5;

        assertThat(allCustomerCarts, hasSize(3));
        assertThat(addedCart.getQuantity(), is(newCartToAdd.getQuantity()));
        assertThat(addedCart.getMovieId(), is(newCartToAdd.getMovieId()));
        assertThat(addedCart.getCustomer().getId(), is(testCustomer1.getId()));
        assertThat(addedCart.getTotalPrice(), is(expectedPrice));
    }

    @Test
    public void updateQuantityInCart() throws Exception{
        ShoppingCart cartToUpdate = new ShoppingCart(testMovie1.getId(), 4L);

        mockMvc.perform(put("/cart/edit/{email}", testCustomer1.getEmail())
                .content(objectMapper.writeValueAsString(cartToUpdate))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        List<ShoppingCart> testCustomer1Carts = shoppingCartRepository.findByCustomerId(testCustomer1.getId());
        Double expectedPrice = testMovie1.getPrice() * 4;

        assertThat(testCustomer1Carts, hasSize(2));
        ShoppingCart updatedCart = testCustomer1Carts.get(0);
        assertThat(updatedCart.getMovieId(), is(cartToUpdate.getMovieId()));
        assertThat(updatedCart.getQuantity(), is(cartToUpdate.getQuantity()));
        assertThat(updatedCart.getTotalPrice(),is(expectedPrice));
    }

    @Test
    public void removeItemFromCustomerCartTest() throws Exception{
        ShoppingCart cartToDelete = new ShoppingCart(testCart1.getMovieId(), 1L);

        mockMvc.perform(delete("/cart/delete/{email}", testCustomer1.getEmail())
                .content(objectMapper.writeValueAsString(cartToDelete))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        List<ShoppingCart> testCustomer1Carts = shoppingCartRepository.findByCustomerId(testCustomer1.getId());

        assertThat(testCustomer1Carts, hasSize(1));
        assertThat(testCustomer1Carts.get(0).getCartId(), is(testCart2.getCartId()));
        assertThat(testCustomer1Carts.get(0).getMovieId(), is(testCart2.getMovieId()));
        assertThat(testCustomer1Carts.get(0).getQuantity(), is(testCart2.getQuantity()));
    }

    @Test
    public void removeAllItemsFromCartByCustomer() throws Exception{
        mockMvc.perform(delete("/cart/deleteAll/{email}", testCustomer1.getEmail()))
                .andDo(print())
                .andExpect(status().isOk());

        List<ShoppingCart> testCustomer1Carts = shoppingCartRepository.findByCustomerId(testCustomer1.getId());
        List<ShoppingCart> allCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();

        assertThat(testCustomer1Carts.size(), is(0));
        assertThat(allCarts, hasSize(1));
        assertThat(allCarts.get(0).getCustomer().getId(), is(testCustomer2.getId()));
    }
}