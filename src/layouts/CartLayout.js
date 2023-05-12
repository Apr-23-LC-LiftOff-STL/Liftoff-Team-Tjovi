import { Outlet } from "react-router-dom";
import CartItems from "../pages/cart/CartItems";
import Cart from "../pages/cart/Cart";

export default function CartLayout() {
  return (
    <div className="is-fullheight">
    <h1 className="title">Your Cart</h1>
      <Cart />
      <Outlet />
    </div>
  );
}
