package com.liftoff.ecommerce.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;


@Entity
@Data
@AllArgsConstructor
@Builder
public class ShoppingCart{


    @Id
    private Long id;

    @Column
    private Long customerId;

    @Column
    private ArrayList<Long> movieIds;

    public ShoppingCart(){

    }

    public ShoppingCart(Long customerId,ArrayList<Long>movieIds) {
        this.customerId = customerId;
        this.movieIds=movieIds;

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return customerId;
    }

    public void setUserId(Long userId) {
        this.customerId = customerId;
    }

    public ArrayList<Long> getMovieIds() {
        return movieIds;
    }

    public void setMovieIds(ArrayList<Long> movieIds) {
        this.movieIds = movieIds;
    }

    public void addToCart(Long movieId){

        getMovieIds().add(movieId);
    }

    public void deleteFromCart(Long movieId){
        getMovieIds().remove(movieId);
    }
}




