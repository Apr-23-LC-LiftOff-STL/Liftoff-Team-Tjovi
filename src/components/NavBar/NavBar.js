import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SearchBar from "./SearchBar";
import ChatBotDialog from "../Chat/ChatBot";

import logo125 from "./Logo_MovieDL_20230426_125x22.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faRightFromBracket,
  faHistory,
  faRightToBracket,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "../../store/cartStore";
import { useLoginStore } from "../../store/loginStore";

const NavBar = () => {
  const cart = useCartStore((state) => state.cart);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  const [isActive, setisActive] = useState(false);
  const [cartButtonStyling, setCartButtonStyling] = useState();
  const [cartDropdownStyling, setCartDropdownStyling] = useState();

  const [loginButtonStyling, setLoginButtonStyling] = useState();
  const [loginButtonText, setLoginButtonText] = useState();

  const logoutCart = useCartStore((state) => state.logoutCart);
  const cartUser = useCartStore((state) => state.cartUser);
  const setCartUser = useCartStore((state) => state.setCartUser);


  const navigate = useNavigate();

  useEffect(() => {
    if (totalProductsInCart !== 0) {
      setCartButtonStyling("button is-warning has-text-weight-semibold");
      setCartDropdownStyling(
        "button is-small is-warning has-text-weight-normal"
      );
    } else {
      setCartButtonStyling("button has-background-warning");
      setCartDropdownStyling("button is-small has-background-warning-light has-text-weight-normal");
    }
  }, [totalProductsInCart]);

  useEffect(() => {
    if (isLoggedIn) {
      setLoginButtonText("Log Out");
    } else {
      setLoginButtonText("Log In");
    }
  }, [isLoggedIn]);

  const handleLogInButton = () => {
    navigate("/login");
  };

  const handleLogOutButton = () => {
    localStorage.removeItem("token");
    handleClose();
    setLoginButtonText("Log In");
    setLoginButtonStyling("button is-normal is-primary");
    setIsLoggedIn(false);
    logoutCart();
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav
      className="navbar pt-1 pl-4 pr-4"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo125} width="112" height="28" />
        </Link>

        <Link
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div className="navbar-item">
        <SearchBar />
      </div>
      <div className="navbar-end">
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-item my-1">
            <div className="buttons is-hidden-desktop">
              <button
                className={
                  isLoggedIn
                    ? "button is-small is-danger is-outlined has-text-weight-semibold is-hidden-desktop"
                    : "button is-small is-primary has-text-weight-semibold is-hidden-desktop"
                }
                onClick={isLoggedIn ? handleClickOpen : handleLogInButton}
              >
                {loginButtonText}
              </button>
              <Link
                className={cartDropdownStyling}
                to="/cart"
                style={{ marginLeft: "0.5rem" }}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                &nbsp; ({totalProductsInCart})
              </Link>
              <Link className="button is-small has-background-primary-light" to="/account/profile">
                <FontAwesomeIcon icon={faUser} />
                &nbsp; Profile
              </Link>
              <Link className="button is-small has-background-primary-light" to="/account/orders">
                <FontAwesomeIcon icon={faHistory} />
                &nbsp; Orders
              </Link>
              <Link className="button is-small has-background-info-light" to="/help">
                <FontAwesomeIcon icon={faQuestion} />
                &nbsp; Service
                </Link>
            </div>
          </div>

          <div className="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a className="navbar-link">
              <FontAwesomeIcon icon={faUser} />
            </a>

            <div>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/account/profile">
                  <FontAwesomeIcon icon={faUser} /> &nbsp; Profile
                </Link>
                <Link className="navbar-item" to="/account/orders">
                  <FontAwesomeIcon icon={faHistory} /> &nbsp; Orders
                </Link>
                <Link className="navbar-item" to="/help">
                  <FontAwesomeIcon icon={faQuestion} /> &nbsp; Customer Service
                </Link>
              </div>

              <button
                className="navbar-item is-hidden-desktop"
                onClick={!isLoggedIn ? handleLogInButton : handleClickOpen}
              >
                &nbsp; {loginButtonText}
              </button>
              <Link className="navbar-item is-hidden-desktop" to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                &nbsp; Cart{" "}
                <span className={cartDropdownStyling}>
                  ({totalProductsInCart})
                </span>
              </Link>
            </div>
          </div>
          <div className="buttons is-hidden-mobile">
            <button
              className={
                isLoggedIn
                  ? "button is-normal is-danger is-outlined has-text-weight-semibold is-hidden-touch"
                  : "button is-normal is-primary has-text-weight-semibold is-hidden-touch"
              }
              onClick={isLoggedIn ? handleClickOpen : handleLogInButton}
            >
              {loginButtonText}
            </button>
            <Link
              to="/cart"
              className={
                cart.length > 0
                  ? "button is-normal has-background-warning is-hidden-touch"
                  : "button is-normal has-background-warning-light is-hidden-touch"
              }
            >
              <FontAwesomeIcon icon={faCartShopping} />
              &nbsp; ({totalProductsInCart})
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><img src={logo125} width="112" height="28" /></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Would you like to log out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-small is-primary has-text-weight-semibold"
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="button is-small is-danger is-outlined has-text-weight-semibold"
            onClick={handleLogOutButton}
          >
            Log Out
          </button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default NavBar;
