import { useState } from "react";

import { useCartStore } from "../../store/cartStore";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CartSideBar({ allItemsSubtotal }) {
  const [open, setOpen] = useState(false);

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
    <div className="column is-one-fifth mx-6">
      <aside className="menu has-text-centered">
        <div className="box p-5 has-background-grey-lighter">
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
        <div>
          {cart.length > 0 && (
            <div
              className="button is-danger is-small is-pulled-right is-rounded mr-4"
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
        <DialogTitle id="alert-dialog-title">
          {"Remove Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove <span className="has-text-weight-semibold">all items</span> from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button className="button is-small" onClick={handleClose} autoFocus>
            Cancel
          </button>
          <button className="button is-danger is-light is-small" onClick={emptyCartButtonHandler}>Remove Item</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

