package com.liftoff.ecommerce.Service;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class ShoppingCartService {
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public void createShoppingCartClass(String email){
        List<Customer> customer = customerRepository.findByEmail(email);
        if (customer.size()>0){
            Long customerId = customer.get(0).getId();
            ShoppingCart shoppingCart = new ShoppingCart(customerId,new ArrayList<>());
            shoppingCart.setMovieIds(new ArrayList<>());
            shoppingCart.setId(customerId);
            shoppingCartRepository.save(shoppingCart);
        }

    // Geoff's original code
//    public void createShoppingCartClass(Long customerId){
//        if (customerRepository.existsById(customerId)){
//            ShoppingCart shoppingCart = new ShoppingCart(customerId,new ArrayList<>());
//            shoppingCart.setMovieIds(new ArrayList<>());
//            shoppingCart.setId(customerId);
//            shoppingCartRepository.save(shoppingCart);
//        }
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

    public void addToCart(Long id, Long movieId){

        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(id)){

            shoppingCartRepository.findById(id).get().addToCart(movieId);
            shoppingCartRepository.save(shoppingCartRepository.findById(id).get());

        }
    }
    public void removeFromCart(Long id, Long movieId){
        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(id)){
            shoppingCartRepository.findById(id).get().deleteFromCart(movieId);
            shoppingCartRepository.save(shoppingCartRepository.findById(id).get());
        }
    }

}
