package com.liftoff.ecommerce.Models;


import com.fasterxml.jackson.databind.introspect.TypeResolutionContext;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import com.liftoff.ecommerce.Repositories.UserRepository;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import org.apache.tomcat.util.json.JSONParser;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Optional;


@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    @Column(name = "user_id")
    private @NotBlank Integer userId;

    @Column(name = "movie_id")
    private @NotBlank Long movieId;


    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public ShoppingCart() {
    }

    public ShoppingCart(User user, Integer userId) {
        this.user = user;
        this.userId = userId;
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Movie getMovie() {
        return movie;
    }



    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Autowired
    private UserRepository userRepository;

    private ArrayList<Movie> userCart;

    public void createCartForUser(User user) {
        if (userRepository.findById(user.getId()).isPresent()) {
            userCart = new ArrayList<>();

        }

    }
    @Autowired
    ShoppingCartRepository shoppingCartRepository;

    public void showCart(Integer userId){
        if (shoppingCartRepository.existsById(userId)){
            userCart.toString();
        }
    }

    @Autowired
    private MovieRepository movieRepository;

    public void addToCart(Movie movie) {
        if (movieRepository.findById(movie.getId()).isPresent()) {
            userCart.add(movie);
        }

    }

    public void deleteFromCart(Movie movie) {
        if (movieRepository.findById(movie.getId()).isPresent()) {
            userCart.remove(movie);
        }

    }
}





