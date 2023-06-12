import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import "./Cart.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faSubtract,
  faX,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { Fade } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductDetailsDialog from "../products/ProductDetailsDialog";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";
import posterNA from "./posterNA.jpg";

const CartItemNEW = ({
  title,
  posterPath,
  id,
  count,
  price,
  releaseDate,
  subtotal,
}) => {
  const [open, setOpen] = useState(false);
  const [openRemoveAll, setOpenRemoveAll] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const currencySymbol = "$";

  const incrementCartItemButtonHandler = () => {
    incrementCartItem(id);
  };

  const decrementCartItemButtonHandler = () => {
    if (count === 1) {
      handleClickOpen();
    } else {
      decrementCartItem(id);
    }
  };

  const removeAllThisItemButtonHandler = () => {
    handleClickOpenRemoveAll();
    removeAllThisItem(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRemoveAll = () => {
    setOpenRemoveAll(true);
  };

  const handleCloseRemoveAll = () => {
    setOpenRemoveAll(false);
  };

  return (
    <div>
      <div className="columns">
        <div className="column"></div>
        <div className="column is-7 mx-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {posterPath ? (
              <figure className={{ flex: 1 }}>
                <div onClick={handleClickOpen}>
                  <img
                    className="cart-item-img"
                    src={`${baseImgUrl}${posterPath}`}
                    alt={`Poster for ${title}`}
                    style={{
                      borderStyle: "solid",
                      borderColor: "lightgray",
                      borderWidth: "1px",
                    }}
                  ></img>
                </div>
              </figure>
            ) : (
              <img
                className="movie-bar-img"
                src={posterNA}
                alt={`no poster image available for ${title}`}
              />
            )}

            <div className="ml-2 p-2" style={{ flex: 1 }}>
              <span className="is-size-5 has-text-weight-semibold">
                {title}
              </span>
              <div className="is-size-6">({releaseDate?.slice(0, 4)})</div>
            </div>
            {/*               <div>
                Movie ID: {id} Count: {count}
              </div> */}

            <div
              className="p-5 box cart-item-button-box"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              <div className="pb-4 has-text-centered">
                <input
                  className="input is-small has-text-centered has-text-weight-semibold"
                  style={{ minWidth: "36px", maxWidth: "36px" }}
                  number
                  value={count}
                  readOnly
                />
                &nbsp; <span className="menu-label">IN CART</span>
              </div>
              <div className="pb-3 has-text-centered">
                <button
                  className="button is-primary is-small"
                  style={{ minWidth: "36px", maxWidth: "36px" }}
                  onClick={incrementCartItemButtonHandler}
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
                <button
                  className="button is-warning is-small"
                  style={{ minWidth: "36px", maxWidth: "36px" }}
                  onClick={decrementCartItemButtonHandler}
                >
                  <FontAwesomeIcon icon={faSubtract} />
                </button>
                <button
                  className="button is-danger is-small"
                  style={{ minWidth: "36px", maxWidth: "36px" }}
                  onClick={handleClickOpenRemoveAll}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="has-text-right mr-2">
                <p
                  style={{
                    color: price < 10 ? "hsl(348, 100%, 61%)" : "",
                  }}
                >
                  <span className="menu-label">Price: </span>{" "}
                  {currencySymbol}
                  {price?.toFixed(2)}
                </p>
                <div className="has-text-right">
                  <p className="">
                    <span className="menu-label">Sub: </span>{" "}
                    <span>
                      {currencySymbol}
                      {subtotal}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
      <Dialog
        open={openRemoveAll}
        onClose={handleCloseRemoveAll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove <span className="has-text-weight-semibold">"{title}"</span>{" "}
            from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-warning"
            onClick={handleCloseRemoveAll}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="button is-danger is-outlined m-2"
            onClick={removeAllThisItemButtonHandler}
          >
            Remove Item
          </button>
        </DialogActions>
      </Dialog>
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
  );
};

export default CartItemNEW;
