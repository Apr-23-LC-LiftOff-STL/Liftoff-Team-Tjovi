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
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cart = useCartStore((state) => state.cart);
  const cartUser = useCartStore((state) => state.cartUser);

  /*   useEffect(() => {
    useCartStore.getState().initialize();
    console.log(cartUser);
  }, [cart]); */

  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const currencySymbol = "$";

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);
  //const changeItemCount = useCartStore((state) => state.changeItemCount);

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
    handleClickOpen();
    removeAllThisItem(id);
  };

  return (
    <div>
      <div className="columns">
        <div className="column is-4"></div>
        <div className="column is-8 mx-4">
          <div
            className="mx-4"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <figure className="cart-item-img" style={{ flex: '1' }}>
              <div onClick={handleClickOpen}>
                <img
                  src={`${baseImgUrl}${posterPath}`}
                  alt={`Poster for ${title}`}
                ></img>
              </div>
            </figure>

            <div className="px-4" style={{ flex: 1 }}>
              <span className="is-size-5 has-text-weight-semibold">{title}</span>
              <div className="is-size-6">({releaseDate?.slice(0, 4)})</div>
            </div>
            {/*               <div>
                Movie ID: {id} Count: {count}
              </div> */}

            <div
              className="p-5 box"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              <div className="pb-4 has-text-centered">
                <input
                  className="input is-small has-text-centered"
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
                  onClick={handleClickOpen}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p
                style={{
                  color: price < 10 ? "hsl(348, 100%, 61%)" : "",
                }}
              >
                <span className="menu-label">Item Price: &nbsp;</span>
                {currencySymbol}
                {price?.toFixed(2)}
              </p>
              <div className="has-text-right">
              <p className="">
                <span className="menu-label">Subtotal: </span>{" "}
                <span className="">
                  {currencySymbol}
                  {subtotal}
                </span>
              </p>
              </div>
            </div>
          </div>
          <div className="column"></div>
          <hr></hr>
        </div>

        <div>
        </div>
      </div>
      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <img className="mt-4" src={logo125} width="112" height="28" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Remove{" "}
                <span className="has-text-weight-semibold">"{title}"</span> from
                your cart?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                className="button is-warning"
                onClick={handleClose}
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
