import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function CartSideBar({ allItemsSubtotal }) {
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const currencySymbol = "$";

  const checkoutButtonHandler = () => {
    alert(JSON.stringify(cart));
  };

  const emptyCartButtonHandler = () => {
    emptyCart();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  return (
    <div className="column is-one-fifth mx-6">
      <aside className="menu">
      <div className="box p-5 has-background-grey-lighter">
        <p className="menu-label has-text-weight-bold"># OF ITEMS IN CART</p>
        <p className="pl-3">{totalProductsInCart}</p>
        <p className="menu-label has-text-weight-bold">SUBTOTAL</p>
        <p className="pl-3">{currencySymbol} {allItemsSubtotal}</p>
        <p className="menu-label has-text-weight-bold">EST. SALES TAX</p>
        <p className="pl-3">$ -</p>
        <hr></hr>
        <p className="menu-label has-text-weight-bold">GRAND TOTAL</p>
        <p className="has-text-weight-bold pl-3">
        {currencySymbol} {allItemsSubtotal}</p>
        <br />
        <div className="has-text-centered">
        <div className="button is-centered is-normal is-warning has-text-centered" onClick={checkoutButtonHandler}>
          Check Out
        </div>
        </div>
        </div>
      </aside>
      <div>
      <br />
      <div>
      {cart.length > 0 &&
      <div className="button is-danger is-small is-pulled-right is-rounded mr-4"
            onClick={emptyCartButtonHandler}
          >
{/*             <FontAwesomeIcon icon={faX} />
            &nbsp;  */}Empty Cart
          </div>}
          </div>
          </div>
    </div>
  );
}
