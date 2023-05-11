import { InputGroup } from "react-bootstrap";
import "./Cart.css";
import { useState } from "react";

const CartItem = () => {
  const price = 12.98;

  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubtotal] = useState(price * quantity);

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
    setSubtotal(quantity * price);
  };

  const removeElement = () => {
    setQuantity(0);
    setSubtotal(0);
  };

  return (
    <div>
      <ul className="shopping-cart">
        <li className="sp-product-row">
          <div className="sp-product-image">
            <img src="https://fakeimg.pl/100x150/" />
          </div>

          <div className="sp-product-details">
            <h3 className="sp-product-title">The Great Escape</h3>
            <div className="sp-product-description">2009</div>
          </div>
          <form
            className="sp-product-manage"
            oninput="total.value=parseInt(price.value)*parseInt(quantity.value)"
          >
            <input id="price" readonly className="sp-product-price" />${price} x
            <input
              value={quantity}
              onChange={handleQuantity}
              id="quantity"
              className="sp-product-quantity"
              type="number"
              min="0"
            />
            <output id="total" className="sp-product-total-price">
              ${subTotal}
            </output>
            <button
              className="button is-danger is-light is-small"
              onClick={removeElement}
            >
              X
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default CartItem;
