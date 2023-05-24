import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CartSideBar({ allItemsSubtotal }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const currencySymbol = "$";

  const token = "dummy_token_in_CartSideBar";
  const tokenNull = null;

  const checkoutButtonHandler = () => {
    alert(JSON.stringify(cart));
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  const emptyCartButtonHandler = () => {
    emptyCart();
    handleClose();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="column is-one-fifth mx-4">
      <aside
        className="menu has-text-centered card is-shadowless"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <div className="p-5 has-background-grey-lighter">
          <p className="menu-label has-text-weight-bold pt-2">
            {totalProductsInCart} ITEM(S) IN CART
          </p>
          <hr></hr>
          <p className="menu-label has-text-weight-bold">SUBTOTAL</p>
          <p>
            {currencySymbol} {allItemsSubtotal}
          </p>
          <p className="menu-label has-text-weight-bold">EST. SALES TAX</p>
          <p>$ -</p>
          <hr></hr>
          <p className="menu-label has-text-weight-bold">GRAND TOTAL</p>
          <p className="has-text-weight-bold pl-3">
            {currencySymbol} {allItemsSubtotal}
          </p>
          <br />
          <div className="has-text-centered has-text-weight-semibold">
            <div
              className="button is-centered is-normal is-fullwidth is-warning"
              onClick={checkoutButtonHandler}
            >
              Check Out
            </div>
          </div>
        </div>
      </aside>
      <div>
        <br />
        <div className="has-text-centered">
          {cart.length > 0 && (
            <div
              className="button is-small is-danger is-outlined is-rounded"
              onClick={handleClickOpen}
            >
              {" "}
              Empty Cart
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Empty the cart?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove <span className="has-text-weight-semibold">all items</span>{" "}
            from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-small is-warning has-text-weight-semibold"
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="button is-small is-danger is-outlined has-text-weight-semibold"
            onClick={emptyCartButtonHandler}
          >
            Remove All Items
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
