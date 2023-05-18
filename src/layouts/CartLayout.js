import { Outlet } from "react-router-dom";
import Cart from "../pages/cart/Cart";
import CartTotal from "../pages/cart/CartTotal";

export default function CartLayout() {
  return (
    <div className="is-fullheight">
    <h1 className="title">Your Cart</h1>
      <Cart />
      <CartTotal />
      <Outlet />
      <NavBar />
    </div>
  );
}
