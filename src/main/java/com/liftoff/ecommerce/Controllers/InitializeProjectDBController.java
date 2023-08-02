package com.liftoff.ecommerce.Controllers;


import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.liftoff.ecommerce.Models.Genre;
import com.liftoff.ecommerce.Models.Movie;
import com.liftoff.ecommerce.Repositories.GenreRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/initialize/true")
public class InitializeProjectDBController {
    @Autowired
    MovieRepository movieRepo;

    @Autowired
    GenreRepository genreRepo;

    @GetMapping("/initialize/true/true")
    public void goToThisPageAfterYouCloneThisTheFirstTime() throws Exception{
        importGenres();
        makeMovie();
    }

    private void importGenres() {
        String apiKey = "a37b4cb3ae6aa5cc3bb9ed882c3e341e";
        String uri = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=en-US";


        RestTemplate restTemplate = new RestTemplate();
        String json = restTemplate.getForObject(uri, String.class);
        JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        JsonArray genresArray = jsonObject.getAsJsonArray("genres");

        for (JsonElement genreElement : genresArray) {
            JsonObject genreObject = genreElement.getAsJsonObject();
            int id = genreObject.get("id").getAsInt();
            String name = genreObject.get("name").getAsString();

            if (!genreRepo.existsById(id)) {
                Genre genre = new Genre(id, name);
                genreRepo.save(genre);
            }
        }
    }
    public void makeMovie() throws Exception {

        RestTemplate restTemplate = new RestTemplate();
        Gson gson = new GsonBuilder().create();

        for (int movieId = 1; movieId <= 25000; movieId++) {

            String uri = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=a37b4cb3ae6aa5cc3bb9ed882c3e341e&language=en-US";
            String json = null;

            try {
                json = restTemplate.getForObject(uri, String.class);
            } catch (HttpClientErrorException e){
                continue;
            }


            JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();

            if(jsonObject.get("adult").equals("true")){
                continue;
            }

            Movie movie = new Movie();
            // Extract and set title
            movie.setTitle(jsonObject.get("title").getAsString());

            // Extract and set overview
            String overview = jsonObject.get("overview").getAsString();
            movie.setOverview(overview);

            movie.setPopularity(jsonObject.get("popularity").getAsString());

            movie.setTagline(jsonObject.get("tagline").getAsString());
            movie.setVote_average(jsonObject.get("vote_average").getAsString());
            movie.setImdbId(jsonObject.get("imdb_id").getAsString());

            // Check for presence of poster_path in API call, extract and set if not NULL
            if (jsonObject.get("poster_path") != null && !jsonObject.get("poster_path").isJsonNull()){
               String posterPath = jsonObject.get("poster_path").getAsString();
                movie.setPosterPath(posterPath);
            }
            // Extract and set release_date as ReleaseDate field
            String releaseDate = jsonObject.get("release_date").getAsString();
            movie.setReleaseDate(releaseDate);

            // Extract and set the runtime as a String
            String runtime = jsonObject.get("runtime").getAsString();
            movie.setRuntime(runtime);

            // extract and associate all genres
            List<Genre> apiGenres = gson.fromJson(jsonObject.get("genres"), getGenresListType());
            Set<Genre> movieGenres = apiGenres.stream()
                    .map(apiGenre -> (Genre) genreRepo.findById(apiGenre.getId()).orElseGet(() -> {
                        Genre genre = new Genre(apiGenre.getId(), apiGenre.getName());
                        genreRepo.save(genre);
                        return genre;
                    }))
                    .collect(Collectors.toSet());

            movie.setGenres(movieGenres);
            movie.setPrice();
            movieRepo.save(movie);


        }
    }
    private Type getGenresListType() {
        return new TypeToken<List<Genre>>() {
        }.getType();
    }
}
