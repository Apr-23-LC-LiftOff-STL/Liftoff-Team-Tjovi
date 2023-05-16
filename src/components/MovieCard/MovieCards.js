import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import ReactPaginate from 'react-paginate';
import './MovieCards.css';


function MovieCards() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 25;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/movies');
        setMovies(response.data.content);
      } catch (error){
        console.log('Error fetching movies: ', error);
      }
    };
    fetchMovies();
  }, []);
  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Cards</h1>
      </header>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
          />
        ))}
      </div>
    </div>
  );
}
export default MovieCards;