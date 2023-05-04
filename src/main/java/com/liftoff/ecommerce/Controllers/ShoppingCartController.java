package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Models.User;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.UserRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;


@RestController
@RequestMapping("/")
public class ShoppingCartController {

    @Autowired
    ShoppingCartService shoppingCartService;



@GetMapping("/createCart/{userId}")
public void createCartForUser(@PathVariable("userId") Integer userId){
    shoppingCartService.createShoppingCartClass(userId);
}
@PostMapping("/add/{movieId}")
public void addToCart( Long movieId,ShoppingCart shoppingCart){
    shoppingCartService.addToCart(movieId,shoppingCart);
}
@PostMapping("")
public void removeFromCart(Long movieId,ShoppingCart shoppingCart){
    shoppingCartService.removeFromCart(movieId,shoppingCart);
}


}


