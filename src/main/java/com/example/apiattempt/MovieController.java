package com.example.apiattempt;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
