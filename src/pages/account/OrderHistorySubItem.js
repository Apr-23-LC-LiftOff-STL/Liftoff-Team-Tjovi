import { useState, useEffect } from "react";
import { Fade } from "@mui/material";
import axios from "axios";
import "./OrderHistory.css";
import DownloadDialog from "./DownloadDialog";
import ProductDetailsDialog from "../products/ProductDetailsDialog";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import posterNA from "./posterNA.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const OrderHistorySubItem = ({ movieId, count, totalPrice }) => {
  const [productData, setProductData] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const baseProductUrl = "/products/";
  const currencySymbol = "$";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/movies/${movieId}`
        );
        const { title, releaseDate, posterPath, price } = response.data;
        setProductData({ title, releaseDate, posterPath, price });
      } catch (error) {
        console.log(`Error fetching data for movie with ID ${movieId}:`, error);
      }
    };

    fetchData();
  }, [movieId]);

  const expression = /\s[^\s]*$/;

  const createShortcut = (text, limit) => {
    if (text?.length > limit) {
      const part = text.slice(0, limit - 3);
      if (part.match(expression)) {
        return part.replace(expression, "...");
      }
      return part + "...";
    }
    return text;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <tr>
      <td>
        <div onClick={handleClickOpen}>
          <Fade in timeout={500}>
            <div
              style={{
                maxWidth: "80px",
                minWidth: "60px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {productData?.posterPath ? (
                <img
                  className="image"
                  src={`${baseImgUrl}${productData?.posterPath}`}
                  alt={`Poster for ${productData?.title}`}
                  style={{
                    borderStyle: "solid",
                    borderColor: "darkgray",
                    borderWidth: "1px",
                  }}
                />
                          ) : (
              <img
                className="movie-bar-img"
                src={posterNA}
                alt={`no poster image available for ${productData?.title}`}
              />
            )}
            </div>
          </Fade>
          <Fade in timeout={500}>
            <div
              style={{
                maxWidth: "80px",
                minWidth: "60px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
            </div>
          </Fade>
        </div>
      </td>
      <td className="has-text-centered">
        {createShortcut(productData?.title, 30)}
      </td>
      <td className="has-text-right">
        {currencySymbol}
        {(totalPrice / count).toFixed(2)}
      </td>
      <td className="has-text-centered">{count}</td>
      <td className="has-text-left">${totalPrice?.toFixed(2)}</td>
      <td className="has-text-centered">
        <div>
          <DownloadDialog />
        </div>
      </td>
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
          <ProductDetailsDialog id={movieId} handleCloseDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </tr>
  );
};

export default OrderHistorySubItem;
