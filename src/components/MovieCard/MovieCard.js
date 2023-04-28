import React from 'react';
const MovieCard = ({ title, posterPath }) => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';
  return (
    <div className="card">
      <div className="card-image">
        {posterPath && (
          <img src={`${baseImgUrl}${posterPath}`} alt={`Poster for ${title}`} />
        )}
      </div>
      <div className="card-content">
        <div className="title">{title}</div>
      </div>
    </div>
  );
};
export default MovieCard;