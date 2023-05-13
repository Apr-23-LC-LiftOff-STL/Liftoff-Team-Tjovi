import { useLoaderData } from "react-router-dom";
import CartItem from "./CartItem.js";
import { useCartStore } from "../../store/cartStore";
import { useState } from "react";
import "./Cart.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const [thisProductId, setThisProductId] = useState();

  const cart = useCartStore((state) => state.cart);
  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const emptyCart = useCartStore((state) => state.emptyCart);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const product = useLoaderData();
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const incrementCartItemButtonHandler = (id) => {
    setThisProductId(id);
    console.log(JSON.stringify(cart));
    incrementCartItem(thisProductId);
  };

  const decrementCartItemButtonHandler = (id) => {
    setThisProductId(id);
    console.log(JSON.stringify(cart));
    decrementCartItem(thisProductId);
  };

  const removeAllThisItemButtonHandler = (id) => {
    setThisProductId(id);
    console.log(JSON.stringify(cart));
    removeAllThisItem(thisProductId);
  };

  const emptyCartButtonHandler = (e) => {
    emptyCart();
  };

  return (
    <div>
      <div>
        {cart.map((product) => {
          if (cart[product.id] !== 0) {
            return (
              <div>
                <div>
                  <columns className="columns">
                    <column className="column">
                      <CartItem key={product.id} count={product.count} />
                    </column>
                    <column className="column">
                      <div>(Cart component**)</div>
                      <div>Movie ID: {product.id}</div>
                      <div>
                        <div className="card">
                          <button
                            className="button is-primary is-small"
                            onClick={() =>
                              incrementCartItemButtonHandler(product.id)
                            }
                          >
                            <FontAwesomeIcon icon={faAdd} />
                          </button>
                          <input
                            className="input is-small has-text-centered"
                            style={{ width: "6%" }}
                            number
                            value={product.count}
                            readOnly
                          />
                          <button
                            className="button is-warning is-small"
                            onClick={() =>
                              decrementCartItemButtonHandler(product.id)
                            }
                          >
                            <FontAwesomeIcon icon={faSubtract} />
                          </button>
                          <button
                            className="button is-danger is-small"
                            onClick={() =>
                              removeAllThisItemButtonHandler(product.id)
                            }
                          >
                            <FontAwesomeIcon icon={faX} />
                          </button>
                        </div>
                      </div>
                    </column>
                  </columns>
                </div>
              </div>
            );
          }

        })}
        <button
                  className="button is-danger is-normal is-rounded"
                  visible=""
                  onClick={emptyCartButtonHandler}
                >
                  <FontAwesomeIcon icon={faX} />
                  &nbsp; Empty Cart
                </button>
      </div>
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
