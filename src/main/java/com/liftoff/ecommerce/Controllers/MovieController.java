package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.lang.Thread.sleep;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class MovieController {

    @Autowired
    private MovieRepository movieRepo;




    @GetMapping("/{id}")
    public Optional<Movie> searchMovieById(@PathVariable Long id) throws Exception {
        return (movieRepo.findById(id));
    }

    @GetMapping
    public List<Movie> findAllMovies(){
        return (List<Movie>) movieRepo.findAll();
    }




}
