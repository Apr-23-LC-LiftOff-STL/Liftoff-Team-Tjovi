import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieBarCard from "./MovieBarCard.js";
import "./MovieBar.css";
import { useMovieCountStore } from "../../store/movieCountStore";
import { Fade } from "@mui/material";

function MovieBar() {
  const [movies, setMovies] = useState([]);

  const baseProductUrl = "/products/";

  const movieCountGlobal = useMovieCountStore((state) => state.movieCountGlobal);

  const movieBarPicks = [];
  for (let i = 0; movieBarPicks.length < 5; i++) {
    let newId = Math.floor(Math.random() * movieCountGlobal);
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

  if (!movies) {
    return (
      <div className="is-size-6 has-text-centered pt-6 has-text-grey">
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="pt-5">
      <h1 className="has-text-centered pt-6 menu-label">
        More Recommended Movies
      </h1>
      <hr className="movie-bar-hr" />
      <div>
        {movies.length > 0 ? (
          <div className="movie-bar">
            {movies.map((movie) => (
              <div key={movie.id}>
                  <MovieBarCard
                    id={movie.id}
                    price={movie.price}
                    title={movie.title}
                    posterPath={movie.posterPath}
                  />
              </div>
            ))}
          </div>
        ) : (
          <Fade in timeout={2250}>
          <div className="is-size-7 mx-6 my-6 has-text-centered is-italic is-loading">Loading movies...<br /><p className="button is-ghost is-loading"></p></div>
          </Fade>
          )}
      </div>
    </div>
  );
}

export default MovieBar;
