package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    MovieRepository movieRepository;

    @PutMapping("/update")
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie updatedMovie) {
        Optional<Movie> movieOptional = movieRepository.findById(updatedMovie.getId());
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            movie.setTitle(updatedMovie.getTitle());
            movie.customSetPrice(updatedMovie.getPrice());
            movie.setOverview(updatedMovie.getOverview());
            movie.setPosterPath(updatedMovie.getPosterPath());

            Movie savedMovie = movieRepository.save(movie);
            return new ResponseEntity<>(savedMovie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
