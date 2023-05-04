package com.liftoff.ecommerce.Models;



import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;


import org.hibernate.type.SqlTypes;


import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@Builder
public class ShoppingCart{


@Id
private int id;
@Column
private Integer userId;
@Column
private ArrayList<Long> movieIds;

    public ShoppingCart(){

    }

    public ShoppingCart(Integer userId,ArrayList<Long>movieIds) {
        this.movieIds=movieIds;
        this.userId = userId;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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





