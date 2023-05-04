package com.liftoff.ecommerce.Service;

import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ShoppingCartService {
    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserRepository userRepository;


    public void createShoppingCartClass(int userId){
        while (userRepository.existsById(userId)){
            ShoppingCart shoppingCart = new ShoppingCart(userId,new ArrayList<>());
            shoppingCartRepository.save(shoppingCart);
        }
    }

//    public ArrayList<Long> createCart(int userId) {
//
//        if (shoppingCartRepository.existsById(userId)){
//            movies = new ArrayList<>();
//            return movies;
//
//    }
//        return null;
//    }

    public void addToCart(long movieId,ShoppingCart shoppingCart){
        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(shoppingCart.getId())){
           shoppingCart.addToCart(movieId);
        }
    }
    public void removeFromCart(long movieId, ShoppingCart shoppingCart){
        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(shoppingCart.getId())){
            shoppingCart.deleteFromCart(movieId);
        }
    }
}
