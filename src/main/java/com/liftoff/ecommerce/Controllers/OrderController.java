package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomerService customerService;

    @PostMapping("/newOrder/{email}")
    public ResponseEntity<?> createNewOrder(@PathVariable String email){
        Customer customer = customerService.findCustomer(email);
        return orderService.createNewOrder(customer);
    }

    @GetMapping("/history/{email}")
    public ResponseEntity<?> returnAllCompletedOrdersByCustomerId(@PathVariable String email){
        Customer customer = customerService.findCustomer(email);
        return orderService.returnAllCompletedOrdersByCustomerId(customer.getId());
    }

    @GetMapping("/currentPurchase/{email}")
    public ResponseEntity<?> returnMostRecentCompletedOrder(@PathVariable String email){
        Customer customer = customerService.findCustomer(email);
        return orderService.returnMostRecentCompletedOrder(customer.getId());
    }

    @GetMapping("/allOrdersHistory")
    public ResponseEntity<?> returnAllCompletedOrders(){
        return orderService.returnAllCompletedOrders();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }


}
