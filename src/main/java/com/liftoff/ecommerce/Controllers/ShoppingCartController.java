package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Models.User;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;


@RestController
@RequestMapping("/ShoppingCart")
public class ShoppingCartController {



    @Autowired
    private ShoppingCartRepository shoppingCartRepository;
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

@PostMapping("/createCart/{user}")
    public void createCart(@PathVariable User user){
    if (userRepository.existsById(user.getId())){
        ShoppingCart shoppingCart = new ShoppingCart(user,new ArrayList<>());
        shoppingCartRepository.save(shoppingCart);
    }
}

@PostMapping("/add")
    public void addToCart(Movie movie,ShoppingCart shoppingCart){
    if (shoppingCartRepository.findById(shoppingCart.getCartId()).isPresent() && movieRepository.existsById(movie.getId())){
        shoppingCart.addToCart(movie);
        shoppingCartRepository.save(shoppingCart);
    }
}
@PostMapping("/remove")
    public void deleteFromCart(Movie movie,ShoppingCart shoppingCart){
    if (shoppingCartRepository.findById(shoppingCart.getCartId()).isPresent() && movieRepository.existsById(movie.getId())){
        shoppingCart.removeFromCart(movie);
        shoppingCartRepository.save(shoppingCart);

    }
}
    @GetMapping("/{id}")
    public Optional<ShoppingCart> getCartById(@PathVariable Integer id) throws Exception {
        return (shoppingCartRepository.findById(id));
    }




}


