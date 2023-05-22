import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CartTotal = ({ allItemsSubtotal }) => {
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const emptyCartButtonHandler = () => {
    emptyCart();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const currencySymbol = "$";

  const checkoutButtonHandler = () => {
    alert(JSON.stringify(cart));
  };

  return (
    <div className="column is-one-quarter is-offset-half">
      <div className="card px-5 pt-5 pb-5 has-background-primary-light">
        <table className="table has-background-primary-light">
          <tr>
            <td> ({totalProductsInCart}) Items in Cart</td>
          </tr>
          <tr>
            <td>Subtotal:</td>
            <td>$</td>
            <td className="has-text-right">{allItemsSubtotal}</td>
          </tr>
          <tr>
            <td>Est. Sales Tax:</td>
            <td>{currencySymbol}</td>
            <td className="has-text-right"> - </td>
          </tr>
          <tr>
            <td className="has-text-weight-semibold">Grand Total:</td>
            <td>$</td>
            <td className="has-text-right has-text-weight-semibold">{allItemsSubtotal}</td>
          </tr>
          </table>
          <div className="has-text-right pr-2">
          <div
            className="button is-normal is-warning has-text-centered"
            onClick={checkoutButtonHandler}
          >
            Check Out
          </div>
          </div>
          </div>
          <div className="has-text-right pr-5">
          <button
            className="button is-danger is-small is-rounded"
            onClick={emptyCartButtonHandler}
          >
{/*             <FontAwesomeIcon icon={faX} />
            &nbsp;  */}Empty Cart
          </button>
          </div>
      </div>
  );
};

export default CartTotal;
