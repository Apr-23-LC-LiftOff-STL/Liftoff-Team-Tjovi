package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;


@RestController
@RequestMapping("/")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;



    @GetMapping("/createCart/{email}")
    public void createCartForUser(@PathVariable String email){
        shoppingCartService.createShoppingCartClass(email);
    }
    @GetMapping("/add/{id}/{movieId}")
    public void addToCart(@PathVariable Long id,@PathVariable Long movieId){
        shoppingCartService.addToCart(id, movieId);
    }
    @GetMapping("/remove/{id}/{movieId}")
    public void removeFromCart(@PathVariable Long id,@PathVariable Long movieId){
        shoppingCartService.removeFromCart(id, movieId);
    }

    @GetMapping("/cart/{id}")
    public Optional<ShoppingCart> seeCart(@PathVariable Long id) throws Exception{
        return shoppingCartRepository.findById(id);
    }

    // Geoff's original code
//
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

