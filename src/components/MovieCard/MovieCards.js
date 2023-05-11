import React, { useState, useEffect } from "react";
import axios from "axios";
//import data from "./data.js";
import MovieCard from "./MovieCard.js";

function MovieCards() {
  const baseProductUrl = "/products/";

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 36;

  // fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/');
        setMovies(response.data);
      } catch (error){
        console.log('Error fetching movies: ', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <form>
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Movies"
          />
        </form>
        <div className="movie-grid">
          {movies.slice(0,resultsPerPage)
            .filter((movie) => {
              return search.toLowerCase() === ""
                ? movie
                : movie.title.toLowerCase().includes(search) ||
                movie.genres.toLowerCase().includes(search) ||
                movie.releaseDate.includes(search);
            })
            .map((movie) => (
              <a href={`${baseProductUrl}${movie.id}`}>
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterPath={movie.posterPath}
                />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCards;
