import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import ReactPaginate from 'react-paginate';
import './MovieCards.css';

const baseProductUrl = '/products/';

// state
function MovieCards() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 48;

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

  // page count
  const pageCount = Math.ceil(movies.length / resultsPerPage);
  const displayedMovies = movies.slice(
    currentPage * resultsPerPage,
    (currentPage + 1) * resultsPerPage
  );

  // React-Paginate click handler
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
}
  
  return (
    <div className="">
      <header className="">
        <h1>Movie Cards</h1>
      </header>
      <div className="movie-grid">
        {movies.slice(0,48).map((movie) => (
          <a href={`${baseProductUrl}${movie.id}`}>
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
          />
          </a>
        ))}
      </div>
      <br />
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
}
export default MovieCards;