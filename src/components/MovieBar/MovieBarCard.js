import React from "react";
import { useState } from "react";
import { useEffect } from 'react';

import "./MovieBar.css";

import { Fade } from "@mui/material";

const MovieBarCard = ({ title, posterPath, price }) => {

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
       <Fade in timeout={2250}>
        <div>
          <div className="movie-bar-card">
            {posterPath && (
              <img
                className="movie-bar-img"
                src={`${baseImgUrl}${posterPath}`}
                alt={`Poster for ${title}`}
              />
            )}
          </div>
          <div className="movie-bar-card-title">{/* {createShortcut(title, 30)} */}
          </div>
          <div className="movie-bar-card-title has-text-weight-semibold" style={{color: price < 10 ? "hsl(348, 100%, 61%)" : "hsl(0, 0%, 7%)"}}>${price?.toFixed(2)}</div>
        </div>
       </Fade>
    </div>
  );
};
export default MovieBarCard;
