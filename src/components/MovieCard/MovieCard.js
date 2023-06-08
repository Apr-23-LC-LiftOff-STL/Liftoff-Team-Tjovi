import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./MovieCards.css";
import posterNA from "./posterNA.jpg";
import ProductDetailsDialog from "../../pages/products/ProductDetailsDialog";

import { Fade } from "@mui/material";

const MovieCard = ({ id, title, posterPath, price }) => {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const expression = /\s[^\s]*$/;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <div>
      <Fade in timeout={500}>
        <div className="movie-card" onClick={handleClickOpen}>
          <div>
            {posterPath && (
              <img
                className="movie-img"
                src={`${baseImgUrl}${posterPath}`}
                alt={`Poster for ${title}`}
              />
            )}
          </div>
          <div>
            {!posterPath && (
              <img
                className="movie-img"
                src={posterNA}
                alt={`no poster image available for ${title}`}
              />
            )}
          </div>
          <div className="movie-card-title">{createShortcut(title, 40)}</div>
          <div
            className="movie-card-title has-text-weight-semibold"
            style={{
              color: price < 10 ? "hsl(348, 100%, 61%)" : "hsl(0, 0%, 7%)",
            }}
          >
            ${price?.toFixed(2)}
          </div>
        </div>
      </Fade>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/*                     <DialogActions>
            <div className="button is-light m-2" onClick={handleClose}><FontAwesomeIcon icon={faX} /></div>
          </DialogActions> */}
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            <ProductDetailsDialog id={id} handleCloseDialog={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default MovieCard;

