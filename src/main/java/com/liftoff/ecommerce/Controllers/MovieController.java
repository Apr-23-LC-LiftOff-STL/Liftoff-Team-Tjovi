package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Specifications.MovieSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.lang.Thread.sleep;

@CrossOrigin(origins = "http://localhost:3000/products/**")
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepo;


    @GetMapping("/{id}")
    public Optional<Movie> searchMovieById(@PathVariable Long id) throws Exception {
        return (movieRepo.findById(id));
    }

    @GetMapping
    public Page<Movie> findAllMovies(
        @RequestParam(value = "title", required = false) String title,
        @RequestParam(value = "genre", required = false) String genre,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "10") int size,
        @RequestParam(value = "sort", defaultValue = "title") String sort,
        @RequestParam(value = "direction", defaultValue = "ASC") String direction) {

        Specification<Movie> spec = Specification.where(MovieSpecification.hasGenre(genre)).and(MovieSpecification.hasTitle(title));
        PageRequest pageable = PageRequest.of(page, size, Sort.Direction.fromString(direction), sort);

            return movieRepo.findAll(spec, pageable);
    }

   // @GetMapping("/favicon.ico")
    //@ResponseBody
    //public void favicon() {
        // Empty method to handle favicon requests and avoid the type mismatch warning
    //}
}



