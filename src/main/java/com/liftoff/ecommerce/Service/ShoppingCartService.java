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
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.NumberFormat;
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

    public Customer findCustomer(String email){
        List<Customer> customer = customerRepository.findByEmail(email);
        return customer.get(0);
    }

    public void setTotalPrice(ShoppingCart shoppingCart){
        Long movieId = shoppingCart.getMovieId();
        Long quantity = shoppingCart.getQuantity();
        Optional<Movie> movie = movieRepository.findById(movieId);
        Double individualPrice = movie.get().getPrice();
        Double totalPrice = individualPrice * quantity;

        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        String convertedPrice = decimalFormat.format(totalPrice);

        shoppingCart.setTotalPrice(convertedPrice);
    }
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
//    public void addToCart(String email, ShoppingCart shoppingCart){
//        Long movieId = shoppingCart.getMovieId();
//        Long quantity = shoppingCart.getQuantity();
//        // if we add customerId to JWT payload, FE could just pass customerId in the
//        // request body with the other shoppingCart fields, removing this findByEmail step
//        Customer customer = findCustomer(email);
//        Long customerId = customer.getId();
//
//        List<ShoppingCart> customerCart = shoppingCartRepository.findByCustomerId(customerId);
//        // If Customer(id) has no carts
//        if(customerCart.size()==0){
//            createNewShoppingCart(customer, movieId, quantity);
//        } else if(){
//
//
//            for (ShoppingCart currentCart:customerCart) {
//                // If movieId wanting to be added to cart already exists in cart
//                if(currentCart.getMovieId().equals(movieId)){
//                    updateQuantityInCart(currentCart, quantity);
//                    break;
////                if(currentCart.getMovieId()==(movieId)){
////                    updateQuantityInCart(currentCart, quantity);
//
//                    // If movieId wanting to be added to cart does not already exist in cart
//                }
//            }
//        }
//    }

//    public void addToCart(String email, ShoppingCart shoppingCart){
//        Customer customer = findCustomer(email);
//        Long customerId = customer.getId();
//        Long movieId = shoppingCart.getMovieId();
//        Long quantity = shoppingCart.getQuantity();
//        Long duplicateCartId = customerHasCartItemMatchingNewMovieId(customerId, movieId);
//
//
//        //if customer already has a cart item matching movieId
//        if(duplicateCartId!=null){
//            Optional<ShoppingCart> duplicateCart = shoppingCartRepository.findById(duplicateCartId);
//            mergeDuplicateCarts(duplicateCart.get(), shoppingCart);
//        // if customer does not have a cart item matching movieId
//        }
//        if(duplicateCartId==null){
//            createNewShoppingCart(customer, movieId, quantity);
//        }
//    }

//    public Long customerHasCartItemMatchingNewMovieId(Long customerId, Long movieId){
//        Long duplicateCartId=null;
//        List<ShoppingCart> customerCart = shoppingCartRepository.findByCustomerId(customerId);
//        if(customerCart.size()>0){
//            for(ShoppingCart currentCart:customerCart){
//                if(currentCart.getMovieId().equals(movieId)){
//                    duplicateCartId = currentCart.getCartId();
//                }
//            }
//        }
//        return duplicateCartId;
//    }



//    public void mergeDuplicateCarts(ShoppingCart oldCart, ShoppingCart newCart){
//        Long mergedQuantity = oldCart.getQuantity() + newCart.getQuantity();
//        Customer mergedCustomer = oldCart.getCustomer();
//        Long mergedMovieId = oldCart.getMovieId();
//        ShoppingCart mergedCart = new ShoppingCart();
//        mergedCart.setCustomer(mergedCustomer);
//        mergedCart.setMovieId(mergedMovieId);
//        mergedCart.setQuantity(mergedQuantity);
//        setTotalPrice(mergedCart);
//        shoppingCartRepository.save(mergedCart);
//        deleteOldDuplicateCart(oldCart.getCartId());
//    }

