package com.liftoff.ecommerce.Models;

import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.nullValue;

public class ShoppingCartUnitTest {

    @Test
    public void testShoppingCartProperties(){
        Long cartId = 1L;
        Customer testCustomer = new Customer();
        Long movieId = 100L;
        Long quantity = 1L;
        Double totalPrice = 10.00;

        ShoppingCart testShoppingCart = new ShoppingCart();

        testShoppingCart.setCartId(cartId);
        testShoppingCart.setCustomer(testCustomer);
        testShoppingCart.setMovieId(movieId);
        testShoppingCart.setQuantity(quantity);
        testShoppingCart.setTotalPrice(totalPrice);

        assertThat(testShoppingCart.getCartId(), is(cartId));
        assertThat(testShoppingCart.getCustomer(), is(testCustomer));
        assertThat(testShoppingCart.getMovieId(), is(movieId));
        assertThat(testShoppingCart.getQuantity(), is(quantity));
        assertThat(testShoppingCart.getTotalPrice(), is(totalPrice));
    }

    @Test
    public void testShoppingCartConstructorNoArgs(){
        ShoppingCart testShoppingCart = new ShoppingCart();

        assertThat(testShoppingCart.getCartId(), nullValue());
        assertThat(testShoppingCart.getCustomer(), nullValue());
        assertThat(testShoppingCart.getMovieId(), nullValue());
        assertThat(testShoppingCart.getQuantity(), nullValue());
        assertThat(testShoppingCart.getTotalPrice(), nullValue());
    }

    @Test
    public void testShoppingCartConstructorParameterized(){
        Long movieId = 100L;
        Long quantity = 1L;

        ShoppingCart testShoppingCart = new ShoppingCart(movieId, quantity);

        assertThat(testShoppingCart.getCartId(), nullValue());
        assertThat(testShoppingCart.getCustomer(), nullValue());
        assertThat(testShoppingCart.getMovieId(), is(movieId));
        assertThat(testShoppingCart.getQuantity(), is(quantity));
        assertThat(testShoppingCart.getTotalPrice(), nullValue());
    }

}
