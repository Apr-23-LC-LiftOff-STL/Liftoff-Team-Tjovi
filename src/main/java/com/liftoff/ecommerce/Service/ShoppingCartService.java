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
import java.util.Optional;

@Service
public class ShoppingCartService {
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public void addToCart(String email, ShoppingCart shoppingCart){
        Long movieId = shoppingCart.getMovieId();
        Long quantity = shoppingCart.getQuantity();
        // if we add customerId to JWT payload, FE could just pass customerId in the
        // request body with the other shoppingCart fields, removing this findByEmail step
        List<Customer> customer = customerRepository.findByEmail(email);
        Long customerId = customer.get(0).getId();

        List<ShoppingCart> customerCart = shoppingCartRepository.findByCustomerId(customerId);
        // If Customer(id) has one or more carts
        if(customerCart.size()>0){
            for (ShoppingCart currentCart:customerCart) {
                // If movieId wanting to be added to cart already exists in cart
                if(currentCart.getMovieId().equals(movieId)){
                    Long currentQuantity = currentCart.getQuantity();
                    Long updatedQuantity = currentQuantity + shoppingCart.getQuantity();
                    currentCart.setQuantity(updatedQuantity);
                    setTotalPrice(currentCart);
                // If movieId wanting to be added to cart does not already exist in cart
                } else {
                    createNewShoppingCartItem(customer.get(0), movieId, quantity);
                }
            }
        } else {
            createNewShoppingCartItem(customer.get(0), movieId, quantity);
        }
    }

    public void setTotalPrice(ShoppingCart shoppingCart){
        Long movieId = shoppingCart.getMovieId();
        Long quantity = shoppingCart.getQuantity();
        Optional<Movie> movie = movieRepository.findById(movieId);
        Double individualPrice = movie.get().getPrice();
        Double totalPrice = individualPrice * quantity;
        shoppingCart.setTotalPrice(totalPrice);
    }

    public void createNewShoppingCartItem(Customer customer, Long movieId, Long quantity){
        ShoppingCart newCart = new ShoppingCart();
        newCart.setCustomer(customer);
        newCart.setMovieId(movieId);
        newCart.setQuantity(quantity);
        setTotalPrice(newCart);
        shoppingCartRepository.save(newCart);
    }

//            ShoppingCart shoppingCart = new ShoppingCart(customer.get(0),new ArrayList<>());
//            shoppingCart.setMovieIds(new ArrayList<>());
//            shoppingCartRepository.save(shoppingCart);


    // Geoff's original code
//    public void createShoppingCartClass(Long customerId){
//        if (customerRepository.existsById(customerId)){
//            ShoppingCart shoppingCart = new ShoppingCart(customerId,new ArrayList<>());
//            shoppingCart.setMovieIds(new ArrayList<>());
//            shoppingCart.setId(customerId);
//            shoppingCartRepository.save(shoppingCart);
//        }


//    public ArrayList<Long> createCart(int userId) {
//
//        if (shoppingCartRepository.existsById(userId)){
//            movies = new ArrayList<>();
//            return movies;
//
//    }
//        return null;
//    }

//    public void addToCart(Long id, Long movieId){
//
//        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(id)){
//
//            shoppingCartRepository.findById(id).get().addToCart(movieId);
//            shoppingCartRepository.save(shoppingCartRepository.findById(id).get());
//
//        }
//    }
//    public void removeFromCart(Long id, Long movieId){
//        if (movieRepository.existsById(movieId) && shoppingCartRepository.existsById(id)){
//            shoppingCartRepository.findById(id).get().deleteFromCart(movieId);
//            shoppingCartRepository.save(shoppingCartRepository.findById(id).get());
//        }
//    }

}
