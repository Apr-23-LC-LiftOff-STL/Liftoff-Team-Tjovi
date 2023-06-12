package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.CompletedOrderRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    OrderService orderService;
    @PutMapping("/update")
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie updatedMovie) {
        Optional<Movie> movieOptional = movieRepository.findById(updatedMovie.getId());
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            movie.setTitle(updatedMovie.getTitle());
            movie.setOverview(updatedMovie.getOverview());
            movie.setPosterPath(updatedMovie.getPosterPath());
            movie.setPrice(updatedMovie.getPrice());

            Movie savedMovie = movieRepository.save(movie);
            return new ResponseEntity<>(savedMovie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/allOrdersHistory")
    public ResponseEntity<?> returnAllCompletedOrders(){
        return orderService.returnAllCompletedOrders();
    }

    @DeleteMapping("/deleteMovie/{id}")
    public ResponseEntity<?> deleteMovieById(@PathVariable Long id){
        movieRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
