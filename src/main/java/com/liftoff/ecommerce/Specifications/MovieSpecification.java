package com.liftoff.ecommerce.Specifications;

import com.liftoff.ecommerce.Models.Movie;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.Arrays;
import java.util.List;

public class MovieSpecification {


    public static Specification<Movie> hasGenre(String genreNames) {
        return (StringUtils.isBlank(genreNames))
                ? null
                : (movie, cq, cb) -> {
            List<String> genreList = Arrays.asList(genreNames.split(","));
            Predicate[] genrePredicates = new Predicate[genreList.size()];
            int index = 0;
            for (String genreName : genreList) {
                genrePredicates[index] = cb.equal(movie.join("genres").get("name"), genreName);
                index++;
            }
            return cb.and(genrePredicates);
        };
    }

    public static Specification<Movie> hasTitle(String title) {
        return (movie, cq, cb) -> title == null ? null : cb.like(cb.lower(movie.get("title")), "%" + title.toLowerCase() + "%");
    }
}
