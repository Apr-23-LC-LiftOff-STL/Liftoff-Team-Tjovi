package com.liftoff.ecommerce;


import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class ShoppingCartTest{

    @Autowired
    private ShoppingCartService shoppingCartService;

    Customer customer;
    String email;
    Movie movie1;
    Movie movie2;

    @Before
    public void createTestData() {
        email = "test@example.com";
        customer = new Customer();
        customer.setEmail(email);
        movie1 = new Movie("2 Fast 2 Furious" , 9.99);
        movie1.setId(1L);
        movie2 = new Movie("8 Mile", 8.99);
        movie2.setId(2L);
    }

    @Test
    public void testCreateNewShoppingCartService(){
        shoppingCartService.createNewShoppingCart(customer, )
        String spec = "constructor sets unique job ids that are integers";
        assertEquals(spec, Optional.ofNullable(testCart1.getCartId()), 1);
    }


}
