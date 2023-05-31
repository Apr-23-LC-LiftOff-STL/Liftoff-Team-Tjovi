package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Service.OrderService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
