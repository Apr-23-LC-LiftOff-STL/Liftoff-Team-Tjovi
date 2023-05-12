import "./Cart.css";
import CartItem from "./CartItem.js";
import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartTotalAllItems = useCartStore((state) => state.cartTotalAllItems);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const addToCartButtonHandler = (e) => {
    cartTotalAllItems();
    console.log(JSON.stringify(cart));
    addToCart(cart.id);
  };

  const removeFromCartButtonHandler = (e) => {
    cartTotalAllItems();
    console.log(JSON.stringify(cart));
    removeFromCart(cart.id);
    //setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    //setCartMessage(`"${product.title}" was removed from cart!`);
  };

  const emptyCartButtonHandler = (e) => {
    emptyCart();
    //setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    //setCartMessage("Cart Emptied");
  };

  return (
    <div>
    <div>
      {cart.map((product) => {
        if (cart[product.id] !== 0) {
          return (
            <div>
              <columns className="columns">
                <column className="column">
                  <CartItem key={product.id} title={product.count} />
                </column>
                <column className="column">
                  <div>(Cart component**)</div>
                  <div>Movie ID: {product.id}</div>
                  <div>
                    <div className="card">
                      <button
                        className="button is-primary is-small"
                        onClick={addToCartButtonHandler}
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
                        onClick={removeFromCartButtonHandler}
                      >
                        <FontAwesomeIcon icon={faSubtract} />
                      </button>
                      <button className="button is-danger is-small">
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </div>
                  </div>
                </column>
              </columns>
            </div>
          );
        }
      })}
    </div>
    <button
                            className="button is-danger is-normal is-rounded"
                            onClick={emptyCartButtonHandler}
                          >
                            <FontAwesomeIcon icon={faX} />&nbsp; Empty Cart
                          </button>
    </div>
  );
};

export default Cart;
