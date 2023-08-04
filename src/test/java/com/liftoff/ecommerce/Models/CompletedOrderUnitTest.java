package com.liftoff.ecommerce.Models;

import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;

public class CompletedOrderUnitTest {

    @Test
    public void testCompletedOrderProperties(){
        Long id = 1L;
        Customer testCustomer = new Customer();
        String createDt = "2023-01-01";
        Long totalOrderQuantity = 2L;
        Double totalOrderPrice = 10.00;
        Set<CompletedOrderItem> completedOrderItems = new HashSet<>();
        completedOrderItems.add(new CompletedOrderItem());
        completedOrderItems.add(new CompletedOrderItem());
        String email = "test@example.com";

        CompletedOrder testOrder = new CompletedOrder();

        testOrder.setId(id);
        testOrder.setCustomer(testCustomer);
        testOrder.setCreateDt(createDt);
        testOrder.setTotalOrderQuantity(totalOrderQuantity);
        testOrder.setTotalOrderPrice(totalOrderPrice);
        testOrder.setCompletedOrderItems(completedOrderItems);
        testOrder.setEmail(email);

        assertThat(testOrder.getId(), is(id));
        assertThat(testOrder.getCustomer(), is(testCustomer));
        assertThat(testOrder.getCreateDt(), is(createDt));
        assertThat(testOrder.getTotalOrderQuantity(), is(totalOrderQuantity));
        assertThat(testOrder.getTotalOrderPrice(), is(totalOrderPrice));
        assertThat(testOrder.getCompletedOrderItems(), is(completedOrderItems));
        assertThat(testOrder.getEmail(), is(email));
    }

    @Test
    public void testCompletedOrderConstructorNoArgs(){
        CompletedOrder testOrder = new CompletedOrder();

        assertThat(testOrder.getId(), nullValue());
        assertThat(testOrder.getCustomer(), nullValue());
        assertThat(testOrder.getCreateDt(), nullValue());
        assertThat(testOrder.getTotalOrderQuantity(), nullValue());
        assertThat(testOrder.getTotalOrderPrice(), nullValue());
        assertThat(testOrder.getCompletedOrderItems(), nullValue());
        assertThat(testOrder.getEmail(), nullValue());
    }

    @Test
    public void testCompletedOrderConstructorParameterized(){
        Customer testCustomer = new Customer();
        String email = "test@example.com";

        CompletedOrder testOrder = new CompletedOrder(testCustomer, email);

        assertThat(testOrder.getId(), nullValue());
        assertThat(testOrder.getCustomer(), is(testCustomer));
        assertThat(testOrder.getCreateDt(), nullValue());
        assertThat(testOrder.getTotalOrderQuantity(), nullValue());
        assertThat(testOrder.getTotalOrderPrice(), nullValue());
        assertThat(testOrder.getCompletedOrderItems(), nullValue());
        assertThat(testOrder.getEmail(), is(email));
    }
}
