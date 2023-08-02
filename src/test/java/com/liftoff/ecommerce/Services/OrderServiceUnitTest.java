package com.liftoff.ecommerce.Services;

import com.liftoff.ecommerce.Models.*;
import com.liftoff.ecommerce.Repositories.*;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.DecimalFormat;
import java.util.*;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderServiceUnitTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private MovieRepository movieRepository;

    @Mock
    private ShoppingCartRepository shoppingCartRepository;

    @Mock
    private CompletedOrderRepository completedOrderRepository;

    @Mock
    private CompletedOrderedItemRepository completedOrderedItemRepository;

    @InjectMocks
    private OrderService orderService;

    Customer testCustomer;
//    Customer testCustomer2;
    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;
    ShoppingCart testCart1;
    ShoppingCart testCart2;
    List<ShoppingCart> allTestCustomerCarts = new ArrayList<>();
//    ShoppingCart testCart3;
//    ShoppingCart testCart4;
//    CompletedOrderItem testOrderItem1;
//    CompletedOrderItem testOrderItem2;
//    CompletedOrderItem testOrderItem3;
//    CompletedOrderItem testOrderItem4;
//    CompletedOrder testOrder1;
//    CompletedOrder testOrder2;
//    CompletedOrder testOrder3;
    List<CompletedOrder> allCompletedOrders = new ArrayList<>();
    List<CompletedOrder> testCustomer1Orders = new ArrayList<>();
    List<CompletedOrderItem> testOrderItems1 = new ArrayList<>();


    @BeforeEach
    public void setUP(){



        testCustomer = new Customer("John", "Doe", "john@example.com", "123-456-7890",
            "123 Main St.", "1", "St. Louis", "MO", 12345L);
//        testCustomer2 = new Customer("Jane", "Doe", "jane@example.com", "123-456-7890",
//                "123 Main St.", "1", "St. Louis", "MO", 12345L);
//
        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);
//
        testCart1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCart1.setCustomer(testCustomer);
        testCart1.setTotalPrice(testMovie1.getPrice() * testCart1.getQuantity());
        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCustomer(testCustomer);
        testCart2.setTotalPrice(testMovie2.getPrice() * testCart2.getQuantity());
        allTestCustomerCarts.add(testCart1);
        allTestCustomerCarts.add(testCart2);

        testCustomer1Orders.add(new CompletedOrder());
        testOrderItems1.add(new CompletedOrderItem(testCustomer1Orders.get(0), testCart1.getMovieId(), testMovie1.getTitle(),
                testCart1.getQuantity(), testCart1.getTotalPrice()));
        testOrderItems1.add(new CompletedOrderItem(testCustomer1Orders.get(0), testCart2.getMovieId(), testMovie2.getTitle(),
                testCart2.getQuantity(), testCart2.getTotalPrice()));

        testCustomer1Orders.add(new CompletedOrder());
        allCompletedOrders.add(testCustomer1Orders.get(0));
        allCompletedOrders.add(testCustomer1Orders.get(1));
        allCompletedOrders.add(new CompletedOrder());


//        testCart3 = new ShoppingCart(testMovie3.getId(), 3L);
//        testCart3.setCustomer(testCustomer2);
//        testCart3.setTotalPrice(testMovie3.getPrice() * testCart3.getQuantity());
//        testCart4 = new ShoppingCart(testMovie3.getId(), 5L);
//        testCart4.setCustomer(testCustomer1);
//        testCart4.setTotalPrice(testMovie3.getPrice() * testCart4.getQuantity());
//
//        testOrderItem1 = new CompletedOrderItem(testOrder1, testCart1.getMovieId(), testMovie1.getTitle(),
//                testCart1.getQuantity(), testCart1.getTotalPrice());
//        testOrderItem2 = new CompletedOrderItem(testOrder1, testCart2.getMovieId(), testMovie2.getTitle(),
//                testCart2.getQuantity(), testCart2.getTotalPrice());
//        testOrderItem3 = new CompletedOrderItem(testOrder2, testCart3.getMovieId(), testMovie3.getTitle(),
//                testCart3.getQuantity(), testCart3.getTotalPrice());
//
//        testOrder1 = new CompletedOrder(testCustomer1, testCustomer1.getEmail());
//
////        testOrder1.setTotalOrderQuantity(testOrderItem1.getQuantity() + testOrderItem2.getQuantity());
////        testOrder1.setTotalOrderPrice((testOrderItem1.getTotalPrice() * testOrderItem1.getQuantity())
////                +(testOrderItem2.getTotalPrice() * testOrderItem2.getQuantity()));
//
//        testOrder2 = new CompletedOrder(testCustomer2, testCustomer2.getEmail());
//        testOrder2.setTotalOrderQuantity(testOrderItem3.getQuantity());
//        testOrder2.setTotalOrderPrice(testOrderItem3.getTotalPrice());
//
//        testOrderItems1.add(testOrderItem1);
//        testOrderItems1.add(testOrderItem2);
//
//        allCompletedOrders.add(testOrder1);
//        allCompletedOrders.add(testOrder2);
//
//        testCustomer1Orders.add(testOrder1);

}
//    @Test
//    public void testCreateNewOrderSuccess(){
//        when(shoppingCartRepository.findByCustomerId(testCustomer.getId())).thenReturn(allTestCustomerCarts);
//        when(completedOrderRepository.save(any(CompletedOrder.class))).thenAnswer(invocation -> {
//            CompletedOrder testCompletedOrder = invocation.getArgument(0);
//            List<CompletedOrderItem> testCompletedOrderItems = new ArrayList<>();
//            testCompletedOrder.setCustomer(testCustomer);
//            testCompletedOrder.setCompletedOrderItems((Set<CompletedOrderItem>) testCompletedOrderItems);
//            return testCompletedOrder;
//        });
//        when(movieRepository.findById(allTestCustomerCarts.get(0).getMovieId())).thenReturn(Optional.of(testMovie1));
//        when(movieRepository.findById(allTestCustomerCarts.get(1).getMovieId())).thenReturn(Optional.of(testMovie2));
////        when(completedOrderedItemRepository.save(any(CompletedOrderItem.class))).thenAnswer(invocation -> {
////            List<CompletedOrderItem> testCompletedOrderItems = new ArrayList<>();
////            CompletedOrderItem testCompletedOrderItem1 = invocation.getArgument(0);
////            testCompletedOrderItems.add(testCompletedOrderItem1);
////            testCompletedOrderItems.add(testCompletedOrderItem2);
////            return testCompletedOrderItems;
////        });
//
//        ResponseEntity<?> response = orderService.createNewOrder(testCustomer);
//
//        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
//    }
//
    @Test
    public void testCreateNewOrderNoCartFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = orderService.createNewOrder(testCustomer);

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(shoppingCartRepository).findByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(shoppingCartRepository);
    }

    @Test
    public void testCreateNewOrderNoMovieFoundNoMovieFound(){
        when(shoppingCartRepository.findByCustomerId(testCustomer.getId())).thenReturn(allTestCustomerCarts);
        when(movieRepository.findById(testMovie3.getId())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            orderService.createNewOrder(testCustomer);
        });
        verify(shoppingCartRepository).findByCustomerId(testCustomer.getId());
        verify(movieRepository).findById(testMovie3.getId());
        verifyNoMoreInteractions(shoppingCartRepository, movieRepository);
    }

    @Test
    public void testReturnAllCompletedOrdersTestSuccess(){
        when(completedOrderRepository.findAll()).thenReturn(allCompletedOrders);
        ResponseEntity<?> response = orderService.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allCompletedOrders));
        verify(completedOrderRepository).findAll();
        verifyNoMoreInteractions(completedOrderRepository);
    }

    @Test
    public void testReturnAllCompletedOrdersNotFound(){
        when(completedOrderRepository.findAll()).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = orderService.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        verify(completedOrderRepository).findAll();
        verifyNoMoreInteractions(completedOrderRepository);
    }

    @Test
    public void testReturnAllCompletedOrdersByIdSuccess(){
        when(completedOrderRepository.findByCustomerId(testCustomer.getId())).thenReturn(testCustomer1Orders);
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Orders));
        verify(completedOrderRepository).findByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(completedOrderRepository);
    }

    @Test
    public void testReturnAllCompletedOrdersByIdNotFound(){
        when(completedOrderRepository.findByCustomerId(testCustomer.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        verify(completedOrderRepository).findByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(completedOrderRepository);
    }

    @Test
    public void testReturnMostRecentCompletedOrderSuccess(){
        when(completedOrderRepository.findByCustomerId(testCustomer.getId())).thenReturn(testCustomer1Orders);
        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testCustomer.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(testCustomer1Orders.get(testCustomer1Orders.size()-1)));
        verify(completedOrderRepository).findByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(completedOrderRepository);
    }

    @Test
    public void testReturnMostRecentCompletedOrderNotFound(){
        when(completedOrderRepository.findByCustomerId(testCustomer.getId())).thenReturn(Collections.emptyList());
        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testCustomer.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        verify(completedOrderRepository).findByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(completedOrderRepository);
    }

    @Test
    public void testTotalOrderPriceSuccess(){
        when(completedOrderedItemRepository.findByCompletedOrderId(testCustomer1Orders.get(0).getId())).
                thenReturn((List<CompletedOrderItem>) testOrderItems1);
        orderService.setTotalOrderPrice(testCustomer1Orders.get(0));
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(testOrderItems1.get(0).getTotalPrice() + testOrderItems1.get(1).getTotalPrice()));

        assertThat(expectedTotalPrice, is(testCustomer1Orders.get(0).getTotalOrderPrice()));
        verify(completedOrderedItemRepository).findByCompletedOrderId(testCustomer1Orders.get(0).getId());
        verifyNoMoreInteractions(completedOrderedItemRepository);
    }

}
