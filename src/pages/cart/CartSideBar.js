import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import { useLoginStore } from "../../store/loginStore";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function CartSideBar({ allItemsSubtotal }) {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openEmptyCart, setOpenEmptyCart] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [dialogFormValue, setDialogFormValue] = useState("");

  const cartUser = useCartStore((state) => state.cartUser);
  const setCartUser = useCartStore((state) => state.setCartUser);

  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const emptyCart = useCartStore((state) => state.emptyCart);
  const getCart = useCartStore((state) => state.getCart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const currencySymbol = "$";

  const checkoutButtonHandler = () => {
    if (!isLoggedIn) {
      handleClickOpenCheckout();
    } else {
      navigate("/checkout");
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

  const navToLoginButtonHandler = () => {
    navigate("/login");
  };

  const navToCheckoutButtonHandler = () => {
    navigate("/checkout");
  };

  const handleClickOpenEmptyCartDialog = () => {
    setOpenEmptyCart(true);
  };

  const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
  };

  const handleClose = () => {
    setOpenCheckout(false);
    setOpenEmptyCart(false);
  };

  const handleOpenEmail = () => {
    setOpenEmail(true);
  }

  const handleCloseEmail = () => {
    setCartUser(dialogFormValue);
    getCart();
    navigate("/checkout");
  };

  /*   const handleHover = () => {
    alert("hi");
  } */

  return (
    <div className="column is-one-quarter mx-6">
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
            <button
              className="button is-centered is-normal is-fullwidth is-warning"
              disabled={totalProductsInCart < 1}
              onClick={checkoutButtonHandler}
            >
              Check Out
            </button>
          </div>
        </div>
      </aside>
      <div>
        <br />
        <div className="has-text-centered">
          {cart.length > 0 && (
            <div
              className="button is-small is-danger is-outlined is-rounded"
              onClick={handleClickOpenEmptyCartDialog}
            >
              {" "}
              Empty Cart
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={openEmptyCart}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img src={logo125} width="112" height="28" />
        </DialogTitle>
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

      <Dialog
        open={openCheckout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Order history is only available to logged in users.{" "}
            <span className="has-text-weight-semibold">
              Would you like to log in?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-small is-warning has-text-weight-semibold"
            onClick={navToCheckoutButtonHandler}
          >
            Check Out
          </button>
          <button
            className="button is-small is-primary has-text-weight-semibold"
            onClick={navToLoginButtonHandler}
            autoFocus
          >
            Log In
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEmptyCart}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img src={logo125} width="112" height="28" />
        </DialogTitle>
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

      <Dialog
        open={openCheckout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Order history is only available to logged in users.{" "}
            <span className="has-text-weight-semibold">
              Would you like to log in?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-small is-warning has-text-weight-semibold"
            onClick={handleOpenEmail}
          >
            Check Out
          </button>
          <button
            className="button is-small is-primary has-text-weight-semibold"
            onClick={navToLoginButtonHandler}
            autoFocus
          >
            Log In
          </button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEmail} onClose={handleCloseEmail}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are continuing as a guest user.  Please enter your email so we can send a receipt on purchase.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setDialogFormValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmail}>Submit E-mail</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
