package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/returnAll/{email}")
    public ResponseEntity<?> returnCart(@PathVariable String email){
        Customer customer = shoppingCartService.findCustomer(email);
        ResponseEntity response = shoppingCartService.returnCartInstances(customer.getId());
        return response;
    }

    @PostMapping("/add/{email}")
    public ResponseEntity addToCart(@PathVariable String email, @RequestBody ShoppingCart shoppingCart) {
        Customer customer = shoppingCartService.findCustomer(email);
        ResponseEntity response = shoppingCartService.createNewShoppingCart(customer, shoppingCart);
        return response;
    }

    @PutMapping("edit/{cartId}")
    public ResponseEntity updateCartQuantity(@PathVariable Long cartId, @RequestBody ShoppingCart shoppingCart){
        Long newQuantity = shoppingCart.getQuantity();
        ResponseEntity response = shoppingCartService.updateQuantityInCart(cartId, newQuantity);
        return response;
    }

//    @DeleteMapping("/delete")
//    public ResponseEntity deleteFromCart(@RequestBody ShoppingCart shoppingCart){
//        Long id = shoppingCart.getCartId();
//        shoppingCartService.deleteOldDuplicateCart(id);
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
//    @GetMapping("/remove/{id}/{movieId}")
//    public void removeFromCart(@PathVariable Long id,@PathVariable Long movieId){
//        shoppingCartService.removeFromCart(id, movieId);
//    }

//    @GetMapping("/cart/{id}")
//    public Optional<ShoppingCart> returnCart(@PathVariable Long id) throws Exception{
//        return shoppingCartRepository.findById(id);
//    }



    // Geoff's original code
//
//    @GetMapping("/createCart/{email}")
//    public void createCartForUser(@PathVariable String email){
//        shoppingCartService.createShoppingCartClass(email);
//    }
//    @GetMapping("/createCart/{customerId}")
//    public void createCartForUser(@PathVariable Integer customerId){
//        shoppingCartService.createShoppingCartClass(customerId);
//    }
//    @GetMapping("/add/{id}/{movieId}")
//    public void addToCart(@PathVariable int id,@PathVariable Long movieId){
//        shoppingCartService.addToCart(movieId,id);
//    }
//    @GetMapping("/remove/{id}/{movieId}")
//    public void removeFromCart(@PathVariable int id,@PathVariable Long movieId){
//        shoppingCartService.removeFromCart(movieId,id);
//    }
//
//    @GetMapping("/cart/{id}")
//    public Optional<ShoppingCart> seeCart(@PathVariable int id) throws Exception{
//        return shoppingCartRepository.findById(id);
//    }

}

