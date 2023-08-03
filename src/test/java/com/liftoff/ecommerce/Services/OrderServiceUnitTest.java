package com.liftoff.ecommerce.Services;

import com.liftoff.ecommerce.Models.*;
import com.liftoff.ecommerce.Repositories.*;
import com.liftoff.ecommerce.Service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

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
    Movie testMovie1;
    Movie testMovie2;
    Movie testMovie3;
    ShoppingCart testCart1;
    ShoppingCart testCart2;
    List<ShoppingCart> allTestCustomerCarts = new ArrayList<>();
    CompletedOrderItem testOrderItem1;
    CompletedOrderItem testOrderItem2;
    CompletedOrder testOrder1;
    CompletedOrder testOrder2;
    CompletedOrder testOrder3;
    List<CompletedOrder> allCompletedOrders = new ArrayList<>();
    List<CompletedOrder> allTestCustomerOrders = new ArrayList<>();
    List<CompletedOrderItem> allTestOrderItems = new ArrayList<>();
    private Long generatedIdCounter = 1L;




    @BeforeEach
    public void setUP(){
        testCustomer = new Customer("John", "Doe", "john@example.com", "123-456-7890",
            "123 Main St.", "1", "St. Louis", "MO", 12345L);
        testCustomer.setId(1L);

        testMovie1 = new Movie("Test Movie 1", "Test Movie 1", "2021-06-05", "120", 9.99);
        testMovie1.setId(1L);
        testMovie2 = new Movie("Test Movie 2", "Test Movie 2: Return of the Test", "2022-06-05", "140", 8.99);
        testMovie2.setId(2L);
        testMovie3 = new Movie("Test Movie 3", "Test Movie 3: Back Again", "2023-06-05", "160", 7.99);

        testCart1 = new ShoppingCart(testMovie1.getId(), 1L);
        testCart1.setCartId(1L);
        testCart1.setCustomer(testCustomer);
        testCart1.setTotalPrice(testMovie1.getPrice() * testCart1.getQuantity());
        testCart2 = new ShoppingCart(testMovie2.getId(), 2L);
        testCart2.setCartId(2L);
        testCart2.setCustomer(testCustomer);
        testCart2.setTotalPrice(testMovie2.getPrice() * testCart2.getQuantity());
        allTestCustomerCarts.add(testCart1);
        allTestCustomerCarts.add(testCart2);

        testOrder1=new CompletedOrder(testCustomer, testCustomer.getEmail());
        testOrderItem1 = new CompletedOrderItem(testOrder1, testCart1.getMovieId(), testMovie1.getTitle(),
                testCart1.getQuantity(), testCart1.getTotalPrice());
        testOrderItem2 = new CompletedOrderItem(testOrder1, testCart2.getMovieId(), testMovie2.getTitle(),
                testCart2.getQuantity(), testCart2.getTotalPrice());
        testOrder1.setId(1L);
        allTestOrderItems.add(testOrderItem1);
        allTestOrderItems.add(testOrderItem2);

        testOrder2=new CompletedOrder(testCustomer, testCustomer.getEmail());
        testOrder3=new CompletedOrder();

        allCompletedOrders.add(testOrder1);
        allCompletedOrders.add(testOrder2);
        allCompletedOrders.add(testOrder3);

        allTestCustomerOrders.add(testOrder1);
        allTestCustomerOrders.add(testOrder2);
}

    @Test
    public void testCreateNewOrderSuccess(){
        allTestOrderItems.add(testOrderItem1);
        allTestOrderItems.add(testOrderItem2);

        when(shoppingCartRepository.findByCustomerId(testCustomer.getId())).thenReturn(allTestCustomerCarts);
        when(completedOrderRepository.save(any(CompletedOrder.class))).thenAnswer(invocation -> {
            CompletedOrder testCompletedOrder = invocation.getArgument(0);
            testCompletedOrder.setId(1L);
            return testCompletedOrder;
        });
        when(movieRepository.findById(anyLong())).thenReturn(java.util.Optional.of(testMovie1));
        when(movieRepository.findById(anyLong())).thenReturn(java.util.Optional.of(testMovie2));
        when(completedOrderedItemRepository.save(any(CompletedOrderItem.class))).thenAnswer(invocation -> {
            CompletedOrderItem testOrderItem = invocation.getArgument(0);
            testOrderItem.setId(generatedIdCounter);
            generatedIdCounter++;
            return testOrderItem;
        });
        when(completedOrderedItemRepository.findByCompletedOrderId(anyLong()))
                .thenReturn(allTestOrderItems);

        ResponseEntity<?> response = orderService.createNewOrder(testCustomer);

        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        verify(shoppingCartRepository).findByCustomerId(testCustomer.getId());
        verify(completedOrderRepository, times(2)).save(any(CompletedOrder.class));
        verify(movieRepository, times(2)).findById(anyLong());
        verify(completedOrderedItemRepository, times(2)).save(any(CompletedOrderItem.class));
        verify(completedOrderedItemRepository).findByCompletedOrderId(anyLong());
        verify(shoppingCartRepository, times(2)).delete(any(ShoppingCart.class));
        verifyNoMoreInteractions(shoppingCartRepository, movieRepository, completedOrderRepository, completedOrderedItemRepository);
    }

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
        when(movieRepository.findById(testMovie1.getId())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            orderService.createNewOrder(testCustomer);
        });
        verify(shoppingCartRepository).findByCustomerId(testCustomer.getId());
        verify(movieRepository).findById(testMovie1.getId());
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
        when(completedOrderRepository.findByCustomerId(testCustomer.getId())).thenReturn(allTestCustomerOrders);
        ResponseEntity<?> response = orderService.returnAllCompletedOrdersByCustomerId(testCustomer.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allTestCustomerOrders));
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
        when(completedOrderRepository.findByCustomerId(testCustomer.getId())).thenReturn(allTestCustomerOrders);
        ResponseEntity<?> response = orderService.returnMostRecentCompletedOrder(testCustomer.getId());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allTestCustomerOrders.get(allTestCustomerOrders.size()-1)));
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
        when(completedOrderedItemRepository.findByCompletedOrderId(testOrder1.getId()))
                .thenReturn((List<CompletedOrderItem>) allTestOrderItems);
        orderService.setTotalOrderPrice(testOrder1);
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double expectedTotalPrice = Double.parseDouble(decimalFormat.format(allTestOrderItems.get(0).getTotalPrice() + allTestOrderItems.get(1).getTotalPrice()));

        assertThat(expectedTotalPrice, is(testOrder1.getTotalOrderPrice()));
        verify(completedOrderedItemRepository).findByCompletedOrderId(testOrder1.getId());
        verifyNoMoreInteractions(completedOrderedItemRepository);
    }

    @Test
    public void testTotalOrderPriceOrderItemsNotFound(){
        when(completedOrderedItemRepository.findByCompletedOrderId(allCompletedOrders.get(2).getId()))
                .thenReturn(Collections.emptyList());

        assertThrows(RuntimeException.class, () -> orderService.setTotalOrderPrice(allCompletedOrders.get(2)), "Order items not found");
        verify(completedOrderedItemRepository).findByCompletedOrderId(allCompletedOrders.get(2).getId());
        verifyNoMoreInteractions(completedOrderRepository);
    }

}
