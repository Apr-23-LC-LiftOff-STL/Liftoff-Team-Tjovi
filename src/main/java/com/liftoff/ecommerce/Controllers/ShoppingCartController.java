package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Models.User;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@RestController
public class ShoppingCartController {



    @Autowired
    private ShoppingCartRepository shoppingCartRepository;
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;



    @PostMapping("")
    public void createCartForUser(User user){

       if(shoppingCartRepository.findById(user.getId()).isEmpty()){
           ShoppingCart shoppingCart = new ShoppingCart(user,user.getId());
           shoppingCart.createCartForUser(user);
           shoppingCartRepository.save(shoppingCart);
       }
       if(shoppingCartRepository.findById(user.getId()).isPresent()) {
           shoppingCartRepository.findById(user.getId());
       }

    }


    @GetMapping("/cart/{user_id}")
    public void viewCart(ShoppingCart shoppingCart, @PathVariable(name = "user_id") Integer userId){
        shoppingCartRepository.findById(userId);
        shoppingCart.showCart(userId);
    }



@PostMapping("/addToCart/{movie_id}")
    public void addToCart(@PathVariable(name= "movie_id") Movie movie,ShoppingCart shoppingCart){

        if (shoppingCartRepository.existsById(shoppingCart.getUserId())){
            shoppingCart.addToCart(movie);
        }

    }

    @PostMapping("/removeFromCart/{movie_id}")
    public void removeFromCart(@PathVariable(name= "movie_id") Movie movie,ShoppingCart shoppingCart){

        if (shoppingCartRepository.existsById(shoppingCart.getUserId())){
            shoppingCart.deleteFromCart(movie);
        }



    }




}
