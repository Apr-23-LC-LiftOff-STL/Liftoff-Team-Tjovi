//package com.liftoff.ecommerce.Controllers;
//
//import com.liftoff.ecommerce.Models.Customer;
//import com.liftoff.ecommerce.Models.ShoppingCart;
//import com.liftoff.ecommerce.Repositories.CustomerRepository;
//import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
//import com.liftoff.ecommerce.Service.CustomerService;
//import com.liftoff.ecommerce.Service.ShoppingCartService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@ActiveProfiles("test")
//@AutoConfigureTestDatabase
//public class ShoppingCartControllerTestIntegration {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ShoppingCartService shoppingCartService;
//
//    @Autowired
//    private ShoppingCartRepository shoppingCartRepository;
//
//    @Autowired
//    private CustomerService customerService;
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @BeforeEach
//    public void setup() {
//        // Set up mock behavior for the dependencies
//        Customer testCustomer = new Customer("John", "Doe", "john@example.com", "123-456-7890",
//                "123 Main St.", "1", "St. Louis", "MO", 12345L);
//
//        customerRepository.save(testCustomer);
////        customerService.createNewCustomer(testCustomer);
//        ShoppingCart testCart1 = new ShoppingCart(1L, 3L);
//        ShoppingCart testCart2 = new ShoppingCart(2L, 1L);
//
//        shoppingCartService.createNewShoppingCart(testCustomer,testCart1);
//        shoppingCartService.createNewShoppingCart(testCustomer,testCart2);
//    }
//
//    @Test
//    public void testReturnAllCarts() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders.get("/cart/returnAllCarts"))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(print());
//    }
//
//    // Additional test methods for other endpoints can be added here
//
//}
