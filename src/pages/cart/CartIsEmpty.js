import { NavLink } from "react-router-dom";

const CartIsEmpty = () => {
  return (
    <div>
      <section className="section is-medium">
        <h1 className="is-size-3 has-text-centered pt-6 has-text-danger has-text-weight-semibold">
          Your Cart is Empty
        </h1>
        <div className="has-text-centered">
          <NavLink className="is-center" to="/">
            Keep Browsing
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default CartIsEmpty;
