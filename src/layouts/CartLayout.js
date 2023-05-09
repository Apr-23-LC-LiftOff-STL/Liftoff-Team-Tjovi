import { Outlet } from "react-router-dom";
import CartItems from "../pages/cart/CartItems";
import Cart from "../pages/cart/Cart";

export default function CartLayout() {
  return (
    <div>
    <h1 className="title">Your Cart</h1>
    <ul className="shopping-cart">
  <li className="sp-product-row">
      <div className="sp-product-details">
          <h3 className="sp-product-title">Movies in Cart</h3>          
        </div>
        <form className="sp-product-manage">
          <span id="price" readonly className="sp-product-price" >Price</span> 
          <span id="quantity" className="sp-product-quantity">Quantity</span>
          <span id="total" className="sp-product-total-price">Subtotal</span>
          <span className="sp-remove-product">Action</span>
      </form>
    </li>
</ul>
      <Cart />
      <Outlet />
    </div>
  );
}
