import { useLoaderData } from "react-router-dom";
import CartItem from "./CartItem.js";
import { useCartStore } from "../../store/cartStore";
import { useState } from "react";
import CartTotal from "./CartTotal.js";
import "./Cart.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {

  const cart = useCartStore((state) => state.cart);

  const baseImgUrl = 'https://image.tmdb.org/t/p/w300';

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const emptyCart = useCartStore((state) => state.emptyCart);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const movies = useLoaderData();

  const incrementCartItemButtonHandler = (id) => {
    console.log(JSON.stringify(cart));
    incrementCartItem(id);
  };

  const decrementCartItemButtonHandler = (id) => {
    console.log(JSON.stringify(cart));
    decrementCartItem(id);
  };

  const removeAllThisItemButtonHandler = (id) => {
    console.log(JSON.stringify(cart));
    removeAllThisItem(id);
  };

  const emptyCartButtonHandler = (e) => {
    emptyCart();
  };

  return (
    <div>
    <div>
      <div>
        {cart.map((product) => {
          if (cart[product.id] !== 0) {
            return (
              <div>
                <div>
                  <CartItem
                    key={product.id}
                    id={product.id}
                    count={product.count}
                  />
                </div>
              </div>
            );
          }
        })}
        <div>{cart.length > 0 &&
        <button
          className="button is-danger is-normal is-rounded"
          visible=""
          onClick={emptyCartButtonHandler}
        >
          <FontAwesomeIcon icon={faX} />
          &nbsp; Empty Cart
        </button>
        }
        </div>
        </div>
      </div>
      {cart.length === 0 &&
      <h1 className="is-size-3 has-text-centered">Your Cart is Empty</h1>
    }
    <CartTotal />
    </div>
  );
}

// data loader
export const cartProductDetailsLoader = async (id) => {
  const res = await fetch("http://localhost:8080/");

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};
