package com.example.apiattempt;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/initialize/true")
public class InitializeProjectDBController {
    @Autowired
    MovieRepository movieRepo;

    @GetMapping("/initialize/true/true")
    public void goToThisPageAfterYouCloneThisTheFirstTime() throws Exception{
        makeMovie();
    }
    public void makeMovie() throws Exception {

        RestTemplate restTemplate = new RestTemplate();
        Gson gson = new GsonBuilder().create();




        for (int movieId = 1; movieId <= 1000; movieId++) {

            String uri = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=a37b4cb3ae6aa5cc3bb9ed882c3e341e&language=en-US";
            String json = null;

            try {
                json = restTemplate.getForObject(uri, String.class);
            } catch (HttpClientErrorException e){
                continue;
            }


            JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();

            Movie movie = new Movie();
            movie.setTitle(jsonObject.get("title").getAsString());

            String overview = jsonObject.get("overview").getAsString();
            movie.setOverview(overview);

            List<Genre> genres = gson.fromJson(jsonObject.get("genres"), getGenresListType());
            movie.setGenres(String.join(", ", genres.stream().map(Genre::getName).collect(Collectors.toList())));

            if (jsonObject.get("poster_path") != null && !jsonObject.get("poster_path").isJsonNull()){
               String posterPath = jsonObject.get("poster_path").getAsString();
                movie.setPosterPath(posterPath);
            }
            movieRepo.save(movie);


        }
    }
    private Type getGenresListType() {
        return new TypeToken<List<Genre>>() {
        }.getType();
    }
}
