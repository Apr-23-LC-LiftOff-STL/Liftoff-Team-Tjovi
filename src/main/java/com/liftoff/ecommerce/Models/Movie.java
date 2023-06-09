package com.liftoff.ecommerce.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.text.DecimalFormat;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Entity
public class Movie {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String posterPath;

    @Lob
    @Column(name="overview", length=999)
    private String overview;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    @JsonManagedReference
    @JsonIgnore
    private Set<Genre> genres = new HashSet<>();

    private String releaseDate;

    private String runtime;

    private Double price;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getRuntime() {
        return runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice() {
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        Double truePrice = new Random().nextDouble(9, 20);

        this.price = Double.parseDouble(decimalFormat.format(truePrice));
    }

    public void setPrice(Double price){
        this.price = price;
    }
}