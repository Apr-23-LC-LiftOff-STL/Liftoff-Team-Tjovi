import "./CartTotal.css";

import { useCartStore } from "../../store/cartStore";

const CartTotal = ({allItemsSubtotal}) => {

  const cart = useCartStore((state) => state.cart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const checkoutButtonHandler = () => {
    alert(JSON.stringify(cart));
  };

  return (
    <div className="container">
      <div className="cartTotal">
        <span> Items in Cart:</span><span>{totalProductsInCart}</span>  
        <br />
        Subtotal: ${allItemsSubtotal} <br />
        Est. Sales Tax: <br /> <br />
        Grand Total:
        <br/ >
        <br />
        <button className="button is-normal is-danger" onClick={checkoutButtonHandler}>Check Out</button>
      </div>

    </div>
  );
};

export default CartTotal;
