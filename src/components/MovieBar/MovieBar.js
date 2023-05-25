import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieBarCard from "./MovieBarCard.js";
import "./MovieBar.css";

function MovieBar() {
  const [movies, setMovies] = useState([]);

  const baseProductUrl = "/products/";

/*     const randomMovieIds = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 822)
  ); */

  const movieBarPicks = []
  for (let i = 0; movieBarPicks.length < 5; i++) {
    let newId = Math.floor(Math.random() * 822); // TODO:  update 822 to total movie count if database increases
    if (!movieBarPicks.includes(newId)) {
      movieBarPicks.push(newId);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (const randomMovie of movieBarPicks) {
        try {
          const response = await axios.get(
            `http://localhost:8080/movies/${randomMovie}`
          );
          const { title, releaseDate, posterPath, price } = response.data;
          const movieData = {
            id: randomMovie,
            title,
            releaseDate,
            posterPath,
            price,
          };
          data.push(movieData);
        } catch (error) {
          console.log(
            `Error fetching data for product with ID ${randomMovie}:`,
            error
          );
        }
      }
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-6">
      <h1 className="is-size-6 has-text-centered pt-6 has-text-grey">
        Recommended Movies
      </h1>
      <hr className="movie-bar-hr" />
      <div>
        {movies.length > 0 ? (
          <div className="movie-bar">
            {movies.map((movie) => (
              <div key={movie.id}>
                <a href={`${baseProductUrl}${movie.id}`}>
                  <MovieBarCard
                    price={movie.price}
                    title={movie.title}
                    posterPath={movie.posterPath}
                  />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading movies...</div>
        )}
      </div>
    </div>
  );
}

export default MovieBar;
