package com.liftoff.ecommerce.Specifications;

import com.liftoff.ecommerce.Models.Movie;
import org.springframework.data.jpa.domain.Specification;

public class MovieSpecification {

    public static Specification<Movie> hasGenre(String genre) {
        return (movie, cq, cb) -> genre == null ? null : cb.like(cb.lower(movie.get("genres")), "%" + genre.toLowerCase() + "%");
    }

    public static Specification<Movie> hasTitle(String title) {
        return (movie, cq, cb) -> title == null ? null : cb.like(cb.lower(movie.get("title")), "%" + title.toLowerCase() + "%");
    }
}
