import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../../store/cartStore";
import { useLoginStore } from "../../store/loginStore";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function CartSideBar({ allItemsSubtotal }) {
  // const [openCheckout, setOpenCheckout] = useState(false);
  const [openEmptyCart, setOpenEmptyCart] = useState(false);
  const [openCheckoutLogin, setOpenCheckoutLogin] = useState(false);
  // const [openEmail, setOpenEmail] = useState(false);
  // const [dialogFormValue, setDialogFormValue] = useState("");

  const cartUser = useCartStore((state) => state.cartUser);
  const setCartUser = useCartStore((state) => state.setCartUser);

  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const currencySymbol = "$";

  const checkoutButtonHandler = () => {
    if (!isLoggedIn) {
      handleClickOpenCheckoutLogin();
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

  const navToRegisterButtonHandler = () => {
    navigate("/register");
  };

  const navToCheckoutButtonHandler = () => {
    navigate("/checkout");
  };

  const handleClickOpenEmptyCartDialog = () => {
    setOpenEmptyCart(true);
  };

/*   const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
  }; */

  const handleClickOpenCheckoutLogin = () => {
    setOpenCheckoutLogin(true);
  }

  const handleClose = () => {
    // setOpenCheckout(false);
    setOpenEmptyCart(false);
    setOpenCheckoutLogin(false);
  };

/*   const handleOpenEmail = () => {
    setOpenEmail(true);
    setOpenCheckout(false);
  };

  const handleCloseEmail = () => {
    setOpenEmail(false);
  };

  const handleGuestEmail = () => {
    setCartUser(dialogFormValue);
    getCart();
    navigate("/checkout");
  }; */

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
        <img src={logo125} />
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
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove <span className="has-text-weight-semibold">all items</span>{" "}
            from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="button is-warning" onClick={handleClose} autoFocus>
            Cancel
          </button>
          <button
            className="button is-danger is-outlined m-2"
            onClick={emptyCartButtonHandler}
          >
            Remove All Items
          </button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={openCheckoutLogin}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
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
            className="button is-warning"
            onClick={navToCheckoutButtonHandler}
          >
            Check Out
          </button>
          <button
            className="button is-primary m-2"
            onClick={navToLoginButtonHandler}
            autoFocus
          >
            Log In
          </button>
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={openEmptyCart}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove <span className="has-text-weight-semibold">all items</span>{" "}
            from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="button is-warning" onClick={handleClose} autoFocus>
            Cancel
          </button>
          <button
            className="button is-danger is-outlined m-2"
            onClick={emptyCartButtonHandler}
          >
            Remove All Items
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCheckoutLogin}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please log in before continuing to checkout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="button is-link" onClick={navToRegisterButtonHandler}>
            Register
          </button>
          <button
            className="button is-primary has-text-weight-semibold m-2"
            onClick={navToLoginButtonHandler}
            autoFocus
          >
            Log In
          </button>
        </DialogActions>
      </Dialog>

{/*       <Dialog
        open={openCheckout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
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
          <button className="button is-warning" onClick={handleOpenEmail}>
            Continue As Guest
          </button>
          <button
            className="button is-primary has-text-weight-semibold m-2"
            onClick={navToLoginButtonHandler}
            autoFocus
          >
            Log In
          </button>
        </DialogActions>
      </Dialog> */}

{/*       <Dialog open={openEmail} onClose={handleCloseEmail}>
        <DialogTitle>
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="has-text-weight-semibold has-text-danger">You are continuing to checkout as a guest user.</span>
            <br/>Please enter your email so we can send a receipt on purchase.
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
          <div className="button is-primary m-2" onClick={handleGuestEmail}>
            Submit
          </div>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
