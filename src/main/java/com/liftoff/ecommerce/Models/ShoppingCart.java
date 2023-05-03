package com.liftoff.ecommerce.Models;



import jakarta.persistence.*;

import org.hibernate.annotations.JdbcTypeCode;

import org.hibernate.type.SqlTypes;


import java.util.ArrayList;



@Entity
@Table(name = "Shopping_cart")
public class ShoppingCart{


    @Id
    @GeneratedValue
    private int cartId;

    @JdbcTypeCode(SqlTypes.INTEGER)
    @JoinColumn(name = "user",referencedColumnName = "id")
    @ManyToOne
    private User user;
    @JdbcTypeCode(SqlTypes.ARRAY)
    @JoinColumn(name = "movies",referencedColumnName = "id")
    private ArrayList<Movie>movies;

    public ShoppingCart(){}

    public void addToCart(Movie movie){
        this.movies.add(movie);
    }

    public ShoppingCart(User user, ArrayList<Movie>movies) {
        this.user=user;
        this.movies=movies;
    }

    public ShoppingCart(int cartId, User user, ArrayList<Movie> movies) {
        this.cartId = cartId;
        this.user = user;
        this.movies = movies;
    }

    public void removeFromCart(Movie movie){
        this.movies.remove(movie);
    }


    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ArrayList<Movie> getMovies() {
        return movies;
    }

    public void setMovies(ArrayList<Movie> movies) {
        this.movies = movies;
    }





}





