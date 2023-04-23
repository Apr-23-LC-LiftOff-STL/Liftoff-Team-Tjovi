package com.liftoff.ecommerce.Models;

import jakarta.persistence.*;
import java.text.DecimalFormat;
import java.util.Random;

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
    private String genres;

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

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
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
}