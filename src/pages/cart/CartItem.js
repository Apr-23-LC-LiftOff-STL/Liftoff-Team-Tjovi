import "./Cart.css";
import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { Fade } from "@mui/material";

const CartItem = ({
  title,
  posterPath,
  id,
  count,
  price,
  releaseDate,
}) => {

  const [subtotal, setSubtotal] = useState(price*count);

  useEffect(() => {
    if (price && count) {
      setSubtotal((price * count).toFixed(2));
    }
  }, [price, count]);

  const cart = useCartStore((state) => state.cart);

  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);
  //const changeItemCount = useCartStore((state) => state.changeItemCount);

  const incrementCartItemButtonHandler = (e) => {
    //console.log(JSON.stringify(cart));
    incrementCartItem(id);
  };

  const decrementCartItemButtonHandler = (e) => {
    //console.log(JSON.stringify(cart));
    decrementCartItem(id);
  };

  const removeAllThisItemButtonHandler = (e) => {
    //console.log(JSON.stringify(cart));
    removeAllThisItem(id);
  };

  return (
    <div>
      <Fade in timeout={500}>
        <div className="card">
          <Fade in timeout={500}>
            <figure className="cart-item-img">
              <a href={`${baseProductUrl}${id}`}>
                <img
                  src={`${baseImgUrl}${posterPath}`}
                  alt={`Poster for ${title}`}
                ></img>
              </a>
            </figure>
          </Fade>
          <div className="is-size-5">
            {title} ({releaseDate})
          </div>
          <div>
            Movie ID: {id} Count: {count}
          </div>
          <span className="has-text-weight-semibold">Price:</span>{" "}
          <span
            style={{
              color: price < 10 ? "hsl(348, 100%, 61%)" : "",
            }}
          >
            ${price?.toFixed(2)}
          </span>
          <div>Item Subtotal: ${subtotal}</div>
          <div>
            <button
              className="button is-primary is-small"
              onClick={incrementCartItemButtonHandler}
            >
              <FontAwesomeIcon icon={faAdd} />
            </button>
            <input
              className="input is-small has-text-centered"
              style={{ width: "6%" }}
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
      </Fade>
    </div>
  );
};

export default CartItem;
