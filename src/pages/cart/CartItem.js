import "./Cart.css";
import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { Fade } from "@mui/material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Cart from "./Cart";

const CartItem = ({
  title,
  posterPath,
  id,
  count,
  price,
  releaseDate,
  subtotal,
}) => {
  const [open, setOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);

  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);
  //const changeItemCount = useCartStore((state) => state.changeItemCount);

  const incrementCartItemButtonHandler = () => {
    incrementCartItem(id);
    console.log(JSON.stringify(cart));
  };

  const decrementCartItemButtonHandler = () => {
    decrementCartItem(id);
    console.log(JSON.stringify(cart));
  };

  const removeAllThisItemButtonHandler = () => {
    setOpen(true);
    removeAllThisItem(id);
  };

  return (
    <div>
      <Fade in timeout={500}>
        <div className="column is-half is-offset-one-quarter is-vcentered card">
          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <figure className="cart-item-img">
                <a href={`${baseProductUrl}${id}`}>
                  <img
                    src={`${baseImgUrl}${posterPath}`}
                    alt={`Poster for ${title}`}
                  ></img>
                </a>
              </figure>
            </div>
            <div className="column">
              <div className="is-size-5">
                <span className="has-text-weight-semibold">{title}</span> ({releaseDate?.slice(0,4)})
              </div>
{/*               <div>
                Movie ID: {id} Count: {count}
              </div> */}
              <div><span>Price:</span>{" "}
              <span className="has-text-weight-semibold"
                style={{
                  color: price < 10 ? "hsl(348, 100%, 61%)" : "",
                }}
              >
                ${price?.toFixed(2)}
              </span></div>
              <div><span>Item Subtotal:  </span><span className="has-text-weight-semibold">${subtotal}</span></div>
              <div>
                <button
                  className="button is-primary is-small"
                  onClick={incrementCartItemButtonHandler}
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
                <input
                  className="input is-small has-text-centered"
                  style={{ width: "40px" }}
                  number
                  value={count}
                  readOnly
                />
                <button
                  className="button is-warning is-small"
                  onClick={decrementCartItemButtonHandler}
                >
                  <FontAwesomeIcon icon={faSubtract} />
                </button>
                <button
                  className="button is-danger is-small"
                  onClick={removeAllThisItemButtonHandler}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              </div>
            </div>
          </div>
      </Fade>
    </div>
  );
};

export default CartItem;
