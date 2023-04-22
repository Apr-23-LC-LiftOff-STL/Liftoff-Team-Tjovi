package com.example.apiattempt;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Movie {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String posterPath;
    @Lob
    @Column(name="overview", length=5000)
    private String overview;
    private String genres;

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
}