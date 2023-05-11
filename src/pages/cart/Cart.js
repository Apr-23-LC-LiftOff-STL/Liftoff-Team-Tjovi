import "./Cart.css";
import CartItem from "./CartItem.js";
import { useCartStore } from "../../store/cartStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartTotalItems = useCartStore((state) => state.cartTotalItems);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const addToCartButtonHandler = (e) => {
    cartTotalItems();
    console.log(JSON.stringify(cart));
    addToCart(cart.id);
  };

  const removeFromCartButtonHandler = (e) => {
    cartTotalItems();
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
      {cart.map((product) => {
        if (cart[product.id] !== 0) {
          return (
            <div>
            <columns className="columns">
              <column className="column">
              <CartItem key={product.id} title={product.count} />
              </column>
              <column className="column">
              <div>
                  Movie ID: {product.id} Count: {product.count}
                </div>
                <div>
                <div className="card">
                  <button
                    className="button is-primary is-small"
                    onClick={addToCartButtonHandler}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <button
                    className="button is-warning is-small"
                    onClick={removeFromCartButtonHandler}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <button className="button is-danger is-small">X</button>
                </div>
                <div></div>
              </div>
              </column>
            </columns>

            </div>
          );
        }
      })}
    </div>
  );
};

export default Cart;
