package com.liftoff.ecommerce.Models;


import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.nullValue;

public class CompletedOrderItemUnitTest {

    @Test
    public void testCompletedOrderItemProperties(){
        Long id = 1L;
        CompletedOrder testOrder = new CompletedOrder();
        Long movieId = 100L;
        String movieTitle = "Test Movie Title";
        Long quantity = 2L;
        Double totalPrice = 10.00;

        CompletedOrderItem testCompletedOrderItem = new CompletedOrderItem();

        testCompletedOrderItem.setId(id);
        testCompletedOrderItem.setCompletedOrder(testOrder);
        testCompletedOrderItem.setMovieId(movieId);
        testCompletedOrderItem.setMovieTitle(movieTitle);
        testCompletedOrderItem.setQuantity(quantity);
        testCompletedOrderItem.setTotalPrice(totalPrice);

        assertThat(testCompletedOrderItem.getOrderedItemId(), is(id));
        assertThat(testCompletedOrderItem.getCompletedOrder(), is(testOrder));
        assertThat(testCompletedOrderItem.getMovieId(), is(movieId));
        assertThat(testCompletedOrderItem.getMovieTitle(), is(movieTitle));
        assertThat(testCompletedOrderItem.getQuantity(), is(quantity));
        assertThat(testCompletedOrderItem.getTotalPrice(), is(totalPrice));
    }

    @Test
    public void testCompletedOrderItemConstructorNoArgs(){
        CompletedOrderItem testCompletedOrderItem = new CompletedOrderItem();

        assertThat(testCompletedOrderItem.getOrderedItemId(), nullValue());
        assertThat(testCompletedOrderItem.getCompletedOrder(), nullValue());
        assertThat(testCompletedOrderItem.getMovieId(), nullValue());
        assertThat(testCompletedOrderItem.getMovieTitle(), nullValue());
        assertThat(testCompletedOrderItem.getQuantity(), nullValue());
        assertThat(testCompletedOrderItem.getTotalPrice(), nullValue());
    }

    @Test
    public void testCompletedOrderItemConstructorParameterized(){
        CompletedOrder testOrder = new CompletedOrder();
        Long movieId = 100L;
        String movieTitle = "Test Movie Title";
        Long quantity = 2L;
        Double totalPrice = 10.00;

        CompletedOrderItem testCompletedOrderItem = new CompletedOrderItem(testOrder, movieId, movieTitle, quantity, totalPrice);

        assertThat(testCompletedOrderItem.getOrderedItemId(), nullValue());
        assertThat(testCompletedOrderItem.getCompletedOrder(), is(testOrder));
        assertThat(testCompletedOrderItem.getMovieId(), is(movieId));
        assertThat(testCompletedOrderItem.getMovieTitle(), is(movieTitle));
        assertThat(testCompletedOrderItem.getQuantity(), is(quantity));
        assertThat(testCompletedOrderItem.getTotalPrice(), is(totalPrice));

    }
}
