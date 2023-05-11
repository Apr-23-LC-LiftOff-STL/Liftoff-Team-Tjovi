import CartItem from "./CartItem";

const CartItems = () => {
  return (
    <div>
      <div className="is-divider">
        <CartItem />
      </div>
      <div className="is-divider">
        <CartItem />
      </div>
      <div className="columns">
      <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column">
          <div>
            Items in Cart:
            <br />
            Subtotal Cost:
            <br />
            Est. Sales Tax:
            <br />
            <br />
            Grand Total:
          </div>
        </div>
        <div className="column has-text-right">
          <div>
            2
            <br />
            $ XX.XX
            <br />
            $ X.XX
            <br />
            <br />
            $ XX.XX
          </div>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
};

export default CartItems;
