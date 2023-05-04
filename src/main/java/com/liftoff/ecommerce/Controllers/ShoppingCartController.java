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
   private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;



@GetMapping("/createCart/{userId}")
public void createCartForUser(@PathVariable Integer userId){
    shoppingCartService.createShoppingCartClass(userId);
}
@GetMapping("/add/{id}/{movieId}")
public void addToCart(@PathVariable int id,@PathVariable Long movieId){
    shoppingCartService.addToCart(movieId,id);
}
@GetMapping("/remove/{id}/{movieId}")
public void removeFromCart(@PathVariable int id,@PathVariable Long movieId){
    shoppingCartService.removeFromCart(movieId,id);
}

@GetMapping("/cart/{id}")
public Optional<ShoppingCart> seeCart(@PathVariable int id) throws Exception{
  return shoppingCartRepository.findById(id);
}

}


