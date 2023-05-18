import React from "react";
import { useState } from "react";
import { useEffect } from 'react';

import "./MovieCards.css";

import { Fade } from "@mui/material";

const MovieCard = ({ title, posterPath, price }) => {

  const [saleItemStyle, setSaleItemStyle] = useState("");

  useEffect(() => {
    if (price < 10) {
      setSaleItemStyle(
        "movie-card-title has-text-weight-semibold is-danger"
      );
    } else {
      setSaleItemStyle("movie-card-title has-text-weight-semibold");
    }
  }, [price]);

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const expression = /\s[^\s]*$/;

  const createShortcut = (text, limit) => {
    if (text.length > limit) {
      const part = text.slice(0, limit - 3);
      if (part.match(expression)) {
        return part.replace(expression, "...");
      }
      return part + "...";
    }
    return text;
  };

  return (
    <div>
       <Fade in timeout={500}>
        <div className="movie-card">
          <div>
            {posterPath && (
              <img
                className="movie-img"
                src={`${baseImgUrl}${posterPath}`}
                alt={`Poster for ${title}`}
              />
            )}
          </div>
          <div className="movie-card-title">{createShortcut(title, 40)}
          </div>
          <div className="movie-card-title has-text-weight-semibold" style={{color: price < 10 ? "hsl(348, 100%, 61%)" : "hsl(0, 0%, 7%)"}}>${price.toFixed(2)}</div>
        </div>
       </Fade>
    </div>
  );
};
export default MovieCard;
