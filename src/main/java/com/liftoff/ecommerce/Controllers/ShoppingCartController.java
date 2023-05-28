package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/returnAll/{email}")
    public ResponseEntity<?> returnCart(@PathVariable String email){
        Customer customer = shoppingCartService.findCustomer(email);
        return shoppingCartService.returnCartInstances(customer.getId());
    }

    @PostMapping("/add/{email}")
    public ResponseEntity<?> addToCart(@PathVariable String email, @RequestBody ShoppingCart shoppingCart) {
        Customer customer = shoppingCartService.findCustomer(email);
        return shoppingCartService.createNewShoppingCart(customer, shoppingCart);
    }

    // This is assuming Front End is doing the quantity math and sending the new quantity total
    // and not just the quantity to be added to the old quantity. Can do either way though.
    @PutMapping("edit/{cartId}")
    public ResponseEntity<?> updateCartQuantity(@PathVariable Long cartId, @RequestBody ShoppingCart shoppingCart){
        Long newQuantity = shoppingCart.getQuantity();
        return shoppingCartService.updateQuantityInCart(cartId, newQuantity);
    }

    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long cartId){
        return shoppingCartService.removeItemFromCart(cartId);
    }

    @DeleteMapping("/deleteAll/{email}")
    public ResponseEntity<?> removeAllItemsFromCart(@PathVariable String email){
        Customer customer = shoppingCartService.findCustomer(email);
        return shoppingCartService.removeAllItemsFromCart(customer);
    }
}

//    @GetMapping("/remove/{id}/{movieId}")
//    public void removeFromCart(@PathVariable Long id,@PathVariable Long movieId){
//        shoppingCartService.removeFromCart(id, movieId);
//    }

//    @GetMapping("/cart/{id}")
//    public Optional<ShoppingCart> returnCart(@PathVariable Long id) throws Exception{
//        return shoppingCartRepository.findById(id);
//    }



// Geoff's original code
//
//    @GetMapping("/createCart/{email}")
//    public void createCartForUser(@PathVariable String email){
//        shoppingCartService.createShoppingCartClass(email);
//    }
//    @GetMapping("/createCart/{customerId}")
//    public void createCartForUser(@PathVariable Integer customerId){
//        shoppingCartService.createShoppingCartClass(customerId);
//    }
//    @GetMapping("/add/{id}/{movieId}")
//    public void addToCart(@PathVariable int id,@PathVariable Long movieId){
//        shoppingCartService.addToCart(movieId,id);
//    }
//    @GetMapping("/remove/{id}/{movieId}")
//    public void removeFromCart(@PathVariable int id,@PathVariable Long movieId){
//        shoppingCartService.removeFromCart(movieId,id);
//    }
//
//    @GetMapping("/cart/{id}")
//    public Optional<ShoppingCart> seeCart(@PathVariable int id) throws Exception{
//        return shoppingCartRepository.findById(id);
//    }
