import { Outlet } from "react-router-dom";
import Cart from "../pages/cart/Cart";
import CartTotal from "../pages/cart/CartTotal";

export default function CartLayout() {
  return (
    <div>
      <h1 className="title">Your Cart</h1>
      <Cart />
      <Outlet />
    </div>
  );
}
