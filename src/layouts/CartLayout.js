import { Outlet } from "react-router-dom";
import CartItems from "../pages/cart/CartItems";

export default function CartLayout() {
  return (
    <div>
    <h1 className="title">Your Cart</h1>
      <div className="columns">
      <div className="column"></div>
        <div className="column has-text-centered">Image</div>
        <div className="column has-text-centered">Title</div>
        <div className="column has-text-centered">Price</div>
        <div className="column has-text-centered">Quantity</div>
        <div className="column has-text-centered">Remove</div>
        <div className="column has-text-right">Total</div>
        <div className="column"></div>
      </div>
      <CartItems />
      <Outlet />
    </div>
  );
}
