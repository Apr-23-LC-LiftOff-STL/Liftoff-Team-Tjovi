import "./CartTotal.css";

import { useCartStore } from "../../store/cartStore";

const CartTotal = () => {

  const cart = useCartStore((state) => state.cart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  return (
    <div className="container">
      <div className="cartTotal">
        <span> Items in Cart:</span><span>{totalProductsInCart}</span>  
        <br />
        Subtotal: <br />
        Est. Sales Tax: <br /> <br />
        Grand Total:
        <br/ >
        <br />
        <button className="button is-normal is-danger">Purchase</button>
      </div>

    </div>
  );
};

export default CartTotal;
