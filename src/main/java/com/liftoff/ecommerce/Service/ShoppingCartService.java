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
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;


    public void createShoppingCartClass(int userId){
        if (userRepository.existsById(userId)){
            ShoppingCart shoppingCart = new ShoppingCart(userId,new ArrayList<>());
            shoppingCart.setMovieIds(new ArrayList<>());
            shoppingCart.setId(userId);
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

    public void addToCart(long movieId,int id){

        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(id)){

                shoppingCartRepository.findById(id).get().addToCart(movieId);
                shoppingCartRepository.save(shoppingCartRepository.findById(id).get());

        }
    }
    public void removeFromCart(long movieId, int id){
        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(id)){
            shoppingCartRepository.findById(id).get().deleteFromCart(movieId);
            shoppingCartRepository.save(shoppingCartRepository.findById(id).get());
        }
    }

}
