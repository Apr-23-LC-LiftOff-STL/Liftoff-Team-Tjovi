import "./Cart.css";

const CartItem = () => {
  return (
    <div>
      <div className="columns">
        <div className="column"></div>
        <div className="column has-text-centered">
          <div className="product-image">
            <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
          </div>
        </div>
        <div className="column has-text-centered">"The Great Escape"</div>
        <div className="column has-text-centered">Price</div>
        <div className="column has-text-centered">
          <div className="product-quantity">
            <input type="number" value="2" min="1" />
          </div>
        </div>
        <div className="column has-text-centered">
          <div>
            <button>Remove</button>
          </div>
        </div>
        <div className="column has-text-right">$17.89</div>
        <div className="column"></div>
      </div>
    </div>
  );
};

export default CartItem;
