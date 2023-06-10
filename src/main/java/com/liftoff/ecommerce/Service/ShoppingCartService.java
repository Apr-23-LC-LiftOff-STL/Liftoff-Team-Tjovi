package com.liftoff.ecommerce.Service;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CompletedOrderRepository;
import com.liftoff.ecommerce.Repositories.CompletedOrderedItemRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartService {

    private static final String NO_CARTS_FOUND = "No carts matching your criteria were found";

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    public ResponseEntity<?> returnAllCarts() {
        List<ShoppingCart> allShoppingCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        if (allShoppingCarts.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(allShoppingCarts, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> returnCartsByCustomerId(Long customerId) {
        List<ShoppingCart> customerCarts = shoppingCartRepository.findByCustomerId(customerId);
        if (customerCarts.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(customerCarts, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> createNewShoppingCart(Customer customer, ShoppingCart shoppingCart) {
        shoppingCart.setCustomer(customer);
        setTotalPrice(shoppingCart);
        shoppingCartRepository.save(shoppingCart);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateQuantityInCart(Customer customer, ShoppingCart shoppingCart) {
        Long movieIdToUpdate = shoppingCart.getMovieId();
        Long newQuantity = shoppingCart.getQuantity();
        List<ShoppingCart> allCustomersCarts = shoppingCartRepository.findByCustomerId(customer.getId());

        if (allCustomersCarts.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        }

        allCustomersCarts.stream()
                .filter(currentCart -> currentCart.getMovieId().equals(movieIdToUpdate))
                .findFirst()
                .ifPresent(currentCart -> {
                    currentCart.setQuantity(newQuantity);
                    setTotalPrice(currentCart);
                    shoppingCartRepository.save(currentCart);
                });

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> removeItemFromCustomerCart(Customer customer, ShoppingCart shoppingCart) {
        Long movieIdToRemove = shoppingCart.getMovieId();
        List<ShoppingCart> allCustomersCarts = shoppingCartRepository.findByCustomerId(customer.getId());

        if (allCustomersCarts.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        }

        allCustomersCarts.stream()
                .filter(currentCart -> currentCart.getMovieId().equals(movieIdToRemove))
                .findFirst()
                .ifPresent(currentCart -> shoppingCartRepository.deleteById(currentCart.getCartId()));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> removeAllItemsFromCartByCustomer(Customer customer) {
        List<ShoppingCart> allCustomersCarts = shoppingCartRepository.findByCustomerId(customer.getId());

        if (allCustomersCarts.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        }

        shoppingCartRepository.deleteAll(allCustomersCarts);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void setTotalPrice(ShoppingCart shoppingCart) {
        Long movieId = shoppingCart.getMovieId();
        Long quantity = shoppingCart.getQuantity();
        Optional<Movie> movie = movieRepository.findById(movieId);

        if (movie.isPresent()) {
            Double individualPrice = movie.get().getPrice();
            Double totalPrice = individualPrice * quantity;
            DecimalFormat decimalFormat = new DecimalFormat("0.00");
            shoppingCart.setTotalPrice(Double.parseDouble(decimalFormat.format(totalPrice)));
        } else {
            throw new RuntimeException("Movie not found");
        }
    }
}