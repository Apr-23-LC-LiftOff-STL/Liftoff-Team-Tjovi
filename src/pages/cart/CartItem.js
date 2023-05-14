import "./Cart.css";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CartItem = (props) => {

  const [thisProductId, setThisProductId] = useState();

  const cart = useCartStore((state) => state.cart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const emptyCart = useCartStore((state) => state.emptyCart);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const incrementCartItemButtonHandler = (e) => {
    setThisProductId(props.id);
    console.log(JSON.stringify(cart));
    incrementCartItem(thisProductId);
  };

  const decrementCartItemButtonHandler = (e) => {
    setThisProductId(props.id);
    console.log(JSON.stringify(cart));
    decrementCartItem(thisProductId);
    //setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    //setCartMessage(`"${product.title}" was removed from cart!`);
  };

  const removeAllThisItemButtonHandler = (e) => {
    setThisProductId(props.id);
    console.log(JSON.stringify(cart));
    removeAllThisItem(thisProductId);
  };


  return (
    <div className="card">
      <div>(CartItem component**)</div>
      <div>Movie Image</div>
      <div className="is-size-5">Movie Name (2009)</div>
      <div>
        Movie ID: {props.id} Count: {props.count}
      </div>
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
          value={props.count}
          readOnly
        />
        <button
          className="button is-warning is-small"
          onClick={decrementCartItemButtonHandler}
        >
          <FontAwesomeIcon icon={faSubtract} />
        </button>
        <button className="button is-danger is-small">
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
