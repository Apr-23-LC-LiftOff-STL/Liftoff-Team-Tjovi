import React from 'react';
import "./MovieCards.css"

const MovieCard = ({ title, posterPath }) => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';


  return (
    <div className="movie-card">
      <div className="movie-img">
        {posterPath && (
          <img src={`${baseImgUrl}${posterPath}`} alt={`Poster for ${title}`} />
        )}
      </div>
      <div className="">
        <div className="">{title}</div>
      </div>
    </div>
  );
};
export default MovieCard;