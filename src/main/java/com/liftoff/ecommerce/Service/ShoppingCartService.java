package com.liftoff.ecommerce.Service;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@Service
@Component
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    public ResponseEntity<?> returnCartInstances(Long customerId){
        List<ShoppingCart> customerCart = shoppingCartRepository.findByCustomerId(customerId);
        if(customerCart.size()>0){
            return new ResponseEntity<>(customerCart, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> createNewShoppingCart(Customer customer, ShoppingCart shoppingCart){
        ShoppingCart newCart = new ShoppingCart(shoppingCart.getMovieId(), shoppingCart.getQuantity());
        newCart.setCustomer(customer);
        setTotalPrice(newCart);
        shoppingCartRepository.save(newCart);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateQuantityInCart(Customer customer, ShoppingCart shoppingCart) {
        Long customerId = customer.getId();
        Long movieIdToUpdate = shoppingCart.getMovieId();
        Long newQuantity = shoppingCart.getQuantity();
        List<ShoppingCart> allCustomersCarts = shoppingCartRepository.findByCustomerId(customerId);
        for (ShoppingCart currentCart : allCustomersCarts) {
            if (currentCart.getMovieId().equals(movieIdToUpdate)) {
                currentCart.setQuantity(newQuantity);
                setTotalPrice(currentCart);
                shoppingCartRepository.save(currentCart);
                break;
            }
        }
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> removeItemFromCart(Customer customer, ShoppingCart shoppingCart){
        Long customerId = customer.getId();
        Long movieIdToRemove = shoppingCart.getMovieId();
        List<ShoppingCart> allCustomersCarts = shoppingCartRepository.findByCustomerId(customerId);
        for(ShoppingCart currentCart:allCustomersCarts){
            if(currentCart.getMovieId().equals(movieIdToRemove)){
                Long cartId = currentCart.getCartId();
                shoppingCartRepository.deleteById(cartId);
                break;
            }
        }
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> removeAllItemsFromCart(Customer customer){
        List<ShoppingCart> allCustomersCarts = shoppingCartRepository.findByCustomerId(customer.getId());
        shoppingCartRepository.deleteAll(allCustomersCarts);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    public void setTotalPrice(ShoppingCart shoppingCart){
        Long movieId = shoppingCart.getMovieId();
        Long quantity = shoppingCart.getQuantity();
        Optional<Movie> movie = movieRepository.findById(movieId);
        Double individualPrice = movie.get().getPrice();
        Double totalPrice = individualPrice * quantity;

        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        shoppingCart.setTotalPrice(Double.parseDouble(decimalFormat.format(totalPrice)));
    }

    public ResponseEntity<?> returnAllCarts(){
        List<ShoppingCart> shoppingCarts = (List<ShoppingCart>) shoppingCartRepository.findAll();
        return new ResponseEntity<>(shoppingCarts, HttpStatus.OK);
    }
}
