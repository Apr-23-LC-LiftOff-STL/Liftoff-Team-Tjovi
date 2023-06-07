package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @GetMapping("/returnAll/{email}")
    public ResponseEntity<?> returnCart(@PathVariable String email){
        Customer customer = customerService.findCustomer(email);
        return shoppingCartService.returnCartsByCustomerId(customer.getId());
    }

    @PostMapping("/add/{email}")
    public ResponseEntity<?> addToCart(@PathVariable String email, @RequestBody ShoppingCart shoppingCart) {
        Customer customer = customerService.findCustomer(email);
        return shoppingCartService.createNewShoppingCart(customer, shoppingCart);
    }

    // This is assuming Front End is sending the total count and not just the new movies needing to be added
    @PutMapping("/edit/{email}")
    public ResponseEntity<?> updateCartQuantity(@PathVariable String email, @RequestBody ShoppingCart shoppingCart){
        Customer customer = customerService.findCustomer(email);
        return shoppingCartService.updateQuantityInCart(customer, shoppingCart);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable String email, @RequestBody ShoppingCart shoppingCart){
        Customer customer = customerService.findCustomer(email);
        return shoppingCartService.removeItemFromCart(customer, shoppingCart);
    }

    @DeleteMapping("/deleteAll/{email}")
    public ResponseEntity<?> removeAllItemsFromCart(@PathVariable String email){
        Customer customer = customerService.findCustomer(email);
        return shoppingCartService.removeAllItemsFromCart(customer);
    }

    @GetMapping("/returnAllCarts")
    public ResponseEntity<?> returnAllCarts(){
        return shoppingCartService.returnAllCarts();
    }
}

