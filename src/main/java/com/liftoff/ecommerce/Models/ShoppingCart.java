package com.liftoff.ecommerce.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;
//@Column(name= "user_id")
//private @NotBlank Integer userId;
//@Column(name = "movie_id")
//private @NotBlank Long movieId;
//
//@OneToOne
//@JoinColumn(name = "movie_id",referencedColumnName = "id")
//private Movie movie;
//
//@OneToOne(optional = false)
//private User user;
//
//    public Integer getCartId() {
//        return cartId;
//    }
//
//    public void setCartId(Integer cartId) {
//        this.cartId = cartId;
//    }
//
//    public Integer getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }
//
//    public Long getMovieId() {
//        return movieId;
//    }
//
//    public void setMovieId(Long movieId) {
//        this.movieId = movieId;
//    }
}
