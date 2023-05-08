import "./CartTotal.css";

const CartTotal = () => {
  return (
    <div class="container">
      <div className="cartTotal">
        Items in Cart:
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
