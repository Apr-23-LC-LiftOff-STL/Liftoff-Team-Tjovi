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

    // This is assuming Front End is sending the total count and not just the new movies needing to be added
    @PutMapping("/edit/{email}")
    public ResponseEntity<?> updateCartQuantity(@PathVariable String email, @RequestBody ShoppingCart shoppingCart){
        Customer customer = shoppingCartService.findCustomer(email);
        return shoppingCartService.updateQuantityInCart(customer, shoppingCart);
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable String email, @RequestBody ShoppingCart shoppingCart){
        Customer customer = shoppingCartService.findCustomer(email);
        return shoppingCartService.removeItemFromCart(customer, shoppingCart);
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
