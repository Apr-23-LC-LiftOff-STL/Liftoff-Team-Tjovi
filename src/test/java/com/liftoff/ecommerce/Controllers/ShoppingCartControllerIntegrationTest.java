package com.liftoff.ecommerce.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import com.liftoff.ecommerce.config.DatabaseTestConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;


import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.everyItem;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {"spring.config.name=application-test"})
@AutoConfigureMockMvc
@Import(DatabaseTestConfiguration.class)
@ActiveProfiles("test")
public class ShoppingCartControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ObjectMapper objectMapper;

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
        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "123-456-7890",
                "123 Main St.", "1", "St. Louis", "MO", 12345L);
        customerRepository.save(testCustomer1);
        customerRepository.save(testCustomer2);


        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        testMovie1.setId(200L);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        testMovie2.setId(201L);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
        testMovie3.setId(202L);
//        customerService.createNewCustomer(testCustomer);
        testCart1 = new ShoppingCart(testMovie1.getId(), 3L);
        testCart2 = new ShoppingCart(testMovie2.getId(), 1L);
        testCart3 = new ShoppingCart(testMovie3.getId(), 2L);

        testCart1.setCustomer(testCustomer1);
        testCart2.setCustomer(testCustomer1);
        testCart3.setCustomer(testCustomer2);

        shoppingCartRepository.save(testCart1);
        shoppingCartRepository.save(testCart2);
        shoppingCartRepository.save(testCart3);

//        shoppingCartService.createNewShoppingCart(testCustomer,testCart1);
//        shoppingCartService.createNewShoppingCart(testCustomer,testCart2);
    }

    @Test
    public void testReturnAllCarts() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/cart/returnAllCarts")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    public void testReturnCartsByCustomer() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/cart/returnAll/" + testCustomer1.getEmail())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[*].customer.email", everyItem(is(testCustomer1.getEmail()))));
    }
//
//    @Test
//    public void testAddToCart() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.post("/cart/add/" + testCustomer1.getEmail())
//                        .content(objectMapper.writeValueAsString(testCart))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void testUpdateCartQuantity() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.put("/cart/edit/" + testCustomer.getEmail())
//                        .content(objectMapper.writeValueAsString(testCart))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void testRemoveItemFromCustomerCart() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.delete("/cart/delete/" + testCustomer.getEmail())
//                        .content(objectMapper.writeValueAsString(testCart))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void testRemoveAllItemsFromCartByCustomer() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.delete("/cart/deleteAll/" + testCustomer.getEmail())
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
}
