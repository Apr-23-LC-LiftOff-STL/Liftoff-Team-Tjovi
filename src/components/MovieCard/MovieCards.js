import React, { useState, useEffect } from "react";

import axios from "axios";

import MovieCard from "./MovieCard.js";

import { Box } from "@mui/material";
import { Pagination } from "@mui/material";

import { useSearchStore } from "../../store/searchStore.js";
import { useGenreStore } from "../../store/genreStore.js";
import { useSortStore } from "../../store/sortStore.js";

function MovieCards() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const searchTerm = useSearchStore((state) => state.searchTerm);
  const selectedGenres = useGenreStore((state) => state.selectedGenres);
  const sortOptions = useSortStore((state) => state.sortOptions);

  const baseProductUrl = "/products/";
  const cardsPerPage = 30;

  // fetch movies
  const fetchMovies = async (
    query = searchTerm,
    genres = [],
    pageNumber = 0
  ) => {
    try {
      const genreQueryParam =
        selectedGenres.length > 0 ? selectedGenres.join(",") : "";
      const response = await axios.get(
        `http://localhost:8080/?title=${encodeURIComponent(
          query
        )}&genre=${encodeURIComponent(
          genreQueryParam
        )}&page=${pageNumber}&size=${cardsPerPage}&sort=${
          sortOptions[0]
        }&direction=${sortOptions[1]}`
      );
      setTotalElements(response.data.totalElements);
      setMovies(response.data.content);
    } catch (error) {
      console.log("Error fetching movies: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm, selectedGenres, page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [searchTerm, selectedGenres, sortOptions, page]);

  const handleChangePage = (event, value) => {
    setPage(value - 1);
    fetchMovies(searchTerm, selectedGenres, value - 1);
  };

  return (
    <div className="pb-5">
      <div>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id}>
              <a href={`${baseProductUrl}${movie.id}`}>
                <MovieCard
                  title={movie.title}
                  posterPath={movie.posterPath}
                  price={movie.price}
                />
              </a>
            </div>
          ))}
        </div>
        <div>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(totalElements / cardsPerPage)}
              page={page + 1}
              onChange={handleChangePage}
              siblingCount={3}
              boundaryCount={1}
              color="primary"
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default MovieCards;
