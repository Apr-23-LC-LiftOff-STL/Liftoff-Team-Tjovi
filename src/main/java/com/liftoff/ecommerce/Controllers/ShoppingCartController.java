package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Repositories.UserRepository;
import com.liftoff.ecommerce.Models.Movie;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class ShoppingCartController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    private ArrayList<Movie>cart;

//    public void createCartForUser(){
//
//        if (userRepository.existsById())
//    }

@GetMapping("/addToCart/{movie_id}")
    public void addToCart(@PathVariable(name= "movie_id") Long movieId){


    }


}
