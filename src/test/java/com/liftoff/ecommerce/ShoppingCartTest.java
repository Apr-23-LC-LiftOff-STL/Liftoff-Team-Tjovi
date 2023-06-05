//package com.liftoff.ecommerce;
//
//
//import com.liftoff.ecommerce.Controllers.LoginController;
//import com.liftoff.ecommerce.Controllers.MovieController;
//import com.liftoff.ecommerce.Controllers.ShoppingCartController;
//import com.liftoff.ecommerce.Models.Customer;
//import com.liftoff.ecommerce.Models.Movie;
//import com.liftoff.ecommerce.Models.ShoppingCart;
//import com.liftoff.ecommerce.Repositories.CustomerRepository;
//import com.liftoff.ecommerce.Repositories.MovieRepository;
//import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
//import com.liftoff.ecommerce.Service.CustomerService;
//import com.liftoff.ecommerce.Service.ShoppingCartService;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultMatcher;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//
//import java.util.Optional;
//
//import static org.junit.Assert.assertEquals;
//import static org.junit.Assert.assertNotEquals;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.web.servlet.function.RequestPredicates.path;
//
//@RunWith(SpringRunner.class)
//@WebMvcTest(ShoppingCartService.class)
//public class ShoppingCartTest{
//
//    @Autowired
//    private MockMvc mvc;
//
//    @MockBean
//    private ShoppingCartService shoppingCartService;
//
//    @MockBean
//    private ShoppingCartRepository shoppingCartRepository;
//
//    @MockBean
//    private ShoppingCartController shoppingCartController;
//
//    @MockBean
//    private MovieRepository movieRepository;
//
//    @MockBean
//    private MovieController movieController;
//
//    @MockBean
//    private CustomerRepository customerRepository;
//
//    @MockBean
//    private CustomerService customerService;
//
//    Customer testCustomer1;
//    Long testCustomer1Id;
//    Customer testCustomer2;
//    Long testCustomer2Id;
//    Movie testMovie1;
//    Long testMovie1Id;
//    Movie testMovie2;
//    Long testMovie2Id;
//    ShoppingCart testCartReq1;
//    ShoppingCart testCartReq2;
//
//    @Before
//    public void createTestData() {
//        testCustomer1 = new Customer("John", "Doe", "john@example.com", "123-456-7890",
//                "123 Main St.", "1", "St. Louis", "MO", 12345L);
//        customerRepository.save(this.testCustomer1);
//        testCustomer1Id = customerRepository.findByEmail("john@example.com").get(0).getId();
//
//        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "098-765-4321",
//                "999 Broad St.", "1B", "New York", "NY", 99949L);
//        customerRepository.save(this.testCustomer2);
//        testCustomer2Id = customerRepository.findByEmail("jane@example.com").get(0).getId();
//
//
//        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2022-06-05", "120" , 9.99);
//        movieRepository.save(this.testMovie1);
//        testMovie1Id = movieRepository.findByMovieTitle("Test Movie 1").get(0).getId();
//
//        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2023-06-05", "140" , 8.99);
//        movieRepository.save(this.testMovie2);
//        testMovie2Id = movieRepository.findByMovieTitle("Test Movie 2").get(0).getId();
//
//        testCartReq1 = new ShoppingCart(testMovie1Id, 1L);
//
//    }
//
//    @Test
//    public void testFindCustomerService() throws Exception {
//        String email = "john@example.com";
//
//        given(shoppingCartService.findCustomer(email)).willReturn(testCustomer1);
//
//        mvc.perform(get("/cart/{email}")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect((ResultMatcher) jsonPath("john@example.com"));
//
//    }
//
////    @Test
////    public void testAddToCart(){
////        ShoppingCart shoppingCart = new ShoppingCart(testMovie1Id, 3L);
////        shoppingCart.setTotalPrice(9.99);
////        shoppingCart.setCustomer(testCustomer1);
////        Long testCart1Id = shoppingCartRepository.findByCustomerId(testCustomer1Id).get(0).getCartId();
////        shoppingCart.setCartId(testCart1Id);
////
////        given(shoppingCartController.addToCart("john@example.com", testCartReq1)).willReturn(testCustomer1);
////
////            mvc.perform(get())
////
////
////
////        String email = "john@example.com";
////        Customer testCustomer = shoppingCartService.findCustomer(email);
////        String spec = "shoppingCartService method findCustomer takes an email and returns the customer object with that email";
////        assertEquals(spec, customerRepository.findByEmail(email), testCustomer);
////
////
////    }
////
//
//}
