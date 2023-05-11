import "./Cart.css";
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CartItem = (props) => {

  const cart = useCartStore((state) => state.cart);

  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartTotalAllItems = useCartStore((state) => state.cartTotalAllItems);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const addToCartButtonHandler = (e) => {
    cartTotalAllItems();
    console.log(JSON.stringify(cart));
    addToCart(props.id);
  };

  const removeFromCartButtonHandler = (e) => {
    cartTotalAllItems();
    console.log(JSON.stringify(cart));
    removeFromCart(props.id);
    //setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    //setCartMessage(`"${product.title}" was removed from cart!`);
  };

  const emptyCartButtonHandler = (e) => {
    emptyCart();
    //setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    //setCartMessage("Cart Emptied");
  };

  return (
    <div className="card">
      <div>
        Movie ID: {props.id}{" "}Count: {props.count}
      </div>
      <div>
        <button className="button is-primary is-small" onClick={addToCartButtonHandler}><FontAwesomeIcon icon={faAdd} /></button>
        <button className="button is-warning is-small" onClick={removeFromCartButtonHandler}><FontAwesomeIcon icon={faSubtract} /></button>
        <button className="button is-danger is-small"><FontAwesomeIcon icon={faX} /></button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default CartItem;
