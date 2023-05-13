import React, { useState, useEffect } from "react";
import axios from "axios";
//import data from "./data.js";
import MovieCard from "./MovieCard.js";

// import search term (Zustand)
import { useSearchStore } from "../../store/searchStore.js";
import { useGenreStore } from "../../store/genreStore.js";

function MovieCards() {
  const baseProductUrl = "/products/";

  //const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
 
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 36; // TEMP VARIABLE FOR TESTING 2023/05/12

  const searchTerm = useSearchStore((state) => state.searchTerm);
  const selectedGenres = useGenreStore((state) => state.selectedGenres);

  // fetch movies
  useEffect(() => {
    const fetchMovies = async (query = searchTerm, genres = []) => {
      try {
        const genreQueryParam = selectedGenres.length > 0 ? selectedGenres.join(',') : '';
        const pageNumber = 0; // TEMP VARIABLE FOR TESTING 2023/05/12
        const response = await axios.get(`http://localhost:8080/?title=${encodeURIComponent(query)}&genre=${encodeURIComponent(genreQueryParam)}&page=${pageNumber}&size=36&sort=title&direction=ASC`);
    setMovies(response.data.content);
      } catch (error){
        console.log('Error fetching movies: ', error);
      }
    };
    fetchMovies();
  }, [searchTerm, selectedGenres]);

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
           {movies.map((movie) => (
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
