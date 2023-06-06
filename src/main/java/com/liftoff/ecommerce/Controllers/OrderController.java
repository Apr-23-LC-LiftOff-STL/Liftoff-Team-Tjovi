package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @PostMapping("newOrder/{email}")
    public ResponseEntity<?> createNewOrder(@PathVariable String email){
        Customer customer = shoppingCartService.findCustomer(email);
        return orderService.createNewOrder(customer);
    }

    @GetMapping("/history/{email}")
    public ResponseEntity<?> returnAllCompletedOrders(@PathVariable String email){
        Customer customer = shoppingCartService.findCustomer(email);
        return orderService.returnAllCompletedOrders(customer.getId());
    }

    @GetMapping("/currentPurchase/{email}")
    public ResponseEntity<?> returnMostRecentCompletedOrder(@PathVariable String email){
        Customer customer = shoppingCartService.findCustomer(email);
        return orderService.returnMostRecentCompletedOrder(customer.getId());
    }
}
