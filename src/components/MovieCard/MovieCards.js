import React, { useState, useEffect } from "react";
import axios from "axios";
//import data from "./data.js";
import MovieCard from "./MovieCard.js";

// import search term (Zustand)
import { useSearchStore } from "../../store/searchStore.js";

function MovieCards() {
  const baseProductUrl = "/products/";

  //const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
 
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 36;

  const searchTerm = useSearchStore((state) => state.searchTerm);

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
{/*         <form>
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Movies"
          />
        </form> */}
        <div className="movie-grid">
          {movies.slice(0,resultsPerPage)
            .filter((movie) => {
              return searchTerm.toLowerCase() === ""
                ? movie
                : movie.title.toLowerCase().includes(searchTerm) ||
                movie.genres.toLowerCase().includes(searchTerm) ||
                movie.releaseDate.includes(searchTerm);
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
