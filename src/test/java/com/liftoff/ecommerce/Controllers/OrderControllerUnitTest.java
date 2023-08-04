package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.CompletedOrder;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderControllerUnitTest {

    @Mock
    private OrderService orderService;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private OrderController orderController;

    Customer testCustomer = new Customer();
    CompletedOrder testOrder1 = new CompletedOrder();
    CompletedOrder testOrder2 = new CompletedOrder();
    CompletedOrder testOrder3 = new CompletedOrder();
    List<CompletedOrder> allTestOrders = new ArrayList<>();
    List<CompletedOrder> allTestCustomerOrders = new ArrayList<>();

    @BeforeEach
    public void createTestData() {
        MockitoAnnotations.openMocks(this);

        testOrder1.setCustomer(testCustomer);
        testOrder2.setCustomer(testCustomer);

        allTestCustomerOrders.add(testOrder1);
        allTestCustomerOrders.add(testOrder2);

        allTestOrders.add(testOrder1);
        allTestOrders.add(testOrder2);
        allTestOrders.add(testOrder3);
    }

    @Test
    public void testReturnAllCompletedOrdersSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(allTestOrders, HttpStatus.OK);
        when(orderService.returnAllCompletedOrders()).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allTestOrders));
        verify(orderService).returnAllCompletedOrders();
        verifyNoMoreInteractions(orderService);
    }

    @Test
    public void testReturnAllCompletedOrdersNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No orders matching your criteria were found", HttpStatus.NOT_FOUND);
        when(orderService.returnAllCompletedOrders()).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.returnAllCompletedOrders();

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        verify(orderService).returnAllCompletedOrders();
        verifyNoMoreInteractions(orderService);
    }

    @Test
    public void testReturnAllCompletedOrdersByCustomerIdSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(allTestCustomerOrders, HttpStatus.OK);
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.returnAllCompletedOrdersByCustomerId(testCustomer.getId())).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.returnAllCompletedOrdersByCustomerId(testCustomer.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allTestCustomerOrders));
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).returnAllCompletedOrdersByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(customerService, orderService);
    }

    @Test
    public void testReturnAllCompletedOrdersByCustomerIdNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No orders matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.returnAllCompletedOrdersByCustomerId(testCustomer.getId())).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.returnAllCompletedOrdersByCustomerId(testCustomer.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).returnAllCompletedOrdersByCustomerId(testCustomer.getId());
        verifyNoMoreInteractions(customerService, orderService);
    }

    @Test
    public void testReturnMostRecentCompletedOrderSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(allTestCustomerOrders.get(allTestCustomerOrders.size()-1), HttpStatus.OK);
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.returnMostRecentCompletedOrder(testCustomer.getId())).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.returnMostRecentCompletedOrder(testCustomer.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(allTestCustomerOrders.get(allTestCustomerOrders.size()-1)));
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).returnMostRecentCompletedOrder(testCustomer.getId());
        verifyNoMoreInteractions(customerService, orderService);
    }

    @Test
    public void testReturnMostRecentCompletedOrderNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No orders matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.returnMostRecentCompletedOrder(testCustomer.getId())).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.returnMostRecentCompletedOrder(testCustomer.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No orders matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).returnMostRecentCompletedOrder(testCustomer.getId());
        verifyNoMoreInteractions(customerService, orderService);
    }

    @Test
    public void testCreateNewOrderSuccess(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>(HttpStatus.CREATED);
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.createNewOrder(testCustomer)).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.createNewOrder(testCustomer.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).createNewOrder(testCustomer);
        verifyNoMoreInteractions(customerService, orderService);
    }

    @Test
    public void testCreateNewOrderCartsNotFound(){
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("No carts matching your criteria were found", HttpStatus.NOT_FOUND);
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.createNewOrder(testCustomer)).thenAnswer(invocation -> expectedResponse);

        ResponseEntity<?> response = orderController.createNewOrder(testCustomer.getEmail());

        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));
        assertThat(response.getBody(), is("No carts matching your criteria were found"));
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).createNewOrder(testCustomer);
        verifyNoMoreInteractions(customerService, orderService);
    }

    @Test
    public void testCreateNewOrderMovieNotFound(){
        when(customerService.findCustomer(testCustomer.getEmail())).thenReturn(testCustomer);
        when(orderService.createNewOrder(testCustomer)).thenThrow(new RuntimeException("No movies matching your criteria were found"));

        assertThrows(RuntimeException.class, () -> orderController.createNewOrder(testCustomer.getEmail()), "No movies matching your criteria were found");
        verify(customerService).findCustomer(testCustomer.getEmail());
        verify(orderService).createNewOrder(testCustomer);
        verifyNoMoreInteractions(customerService, orderService);
    }
}