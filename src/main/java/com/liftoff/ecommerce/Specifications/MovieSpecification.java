package com.liftoff.ecommerce.Specifications;

import com.liftoff.ecommerce.Models.Movie;
import io.micrometer.common.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class MovieSpecification {

    //TODO: Add multiple genre option -- look into exclusivity?
    public static Specification<Movie> hasGenre(String genreName) {
        return  StringUtils.isBlank(genreName) ? null : (movie, cq, cb) -> cb.equal(movie.join("genres").get("name"), genreName);
    }

    public static Specification<Movie> hasTitle(String title) {
        return (movie, cq, cb) -> title == null ? null : cb.like(cb.lower(movie.get("title")), "%" + title.toLowerCase() + "%");
    }
}
