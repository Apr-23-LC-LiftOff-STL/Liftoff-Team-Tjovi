import "./Cart.css";
import CartItem from "./CartItem.js"
import CartTotal from "./CartTotal.js"

const Cart = () => {
  return (
    <div>
        <CartItem />
        <CartItem />
        <CartTotal />
    </div>
  );
};

export default Cart;
