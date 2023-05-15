import React from 'react';
import "./MovieCards.css"

const MovieCard = ({ title, posterPath }) => {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w300';

  const expression = /\s[^\s]*$/;

  const createShortcut = (text, limit) => {
      if (text.length > limit) {
          const part = text.slice(0, limit - 3);
          if (part.match(expression)) {
              return part.replace(expression, '...');
          }
          return part + '...';
      }
      return text;
  };

  return (
    <div className="movie-card">

      <div>
        {posterPath && (
          <img className="movie-img" src={`${baseImgUrl}${posterPath}`} alt={`Poster for ${title}`} />
        )}
      </div>
      <div className="movie-card-title">{createShortcut(title, 40)}</div>
    </div>
  );
};
export default MovieCard;