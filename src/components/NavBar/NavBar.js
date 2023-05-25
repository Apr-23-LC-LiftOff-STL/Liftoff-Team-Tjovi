import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SearchBar from "./SearchBar";

import logo125 from "./Logo_MovieDL_20230426_125x22.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faRightFromBracket,
  faHistory,
  faRightToBracket,
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
  const [loginBurgerButtonIcon, setLoginBurgerButtonIcon] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (totalProductsInCart !== 0) {
      setCartButtonStyling(
        "button is-warning has-text-weight-semibold is-hidden-mobile"
      );
      setCartDropdownStyling("has-text-weight-semibold");
    } else {
      setCartButtonStyling("button is-light is-hidden-mobile");
      setCartDropdownStyling("has-text-weight-normal");
    }
  }, [totalProductsInCart]);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoginButtonText("Log In");
      setLoginButtonStyling("button is-normal is-primary is-hidden-mobile");
      setLoginBurgerButtonIcon(faRightToBracket);
    } else if (isLoggedIn) {
      setLoginButtonText("Log Out");
      setLoginButtonStyling("button is-normal is-danger is-outlined is-hidden-mobile");
      setLoginBurgerButtonIcon(faRightFromBracket);
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
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link is-hidden-mobile">
              <FontAwesomeIcon icon={faUser} className="is-hidden-mobile"/>
            </Link>
            <div className="navbar-dropdown is-left">
              <Link
                className="navbar-item is-hidden-desktop"
                onClick={isLoggedIn ? handleClickOpen : handleLogInButton}
              >
                <span>
                  <FontAwesomeIcon icon={loginBurgerButtonIcon} />
                </span>
                &nbsp; {loginButtonText}
              </Link>
              <Link className="navbar-item is-hidden-desktop" to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                &nbsp; Cart{" "}
                <span className={cartDropdownStyling}>
                  ({totalProductsInCart})
                </span>
              </Link>
              <Link className="navbar-item" to="/account/profile">
                <FontAwesomeIcon icon={faUser} />
                &nbsp; My Profile
              </Link>
              <Link className="navbar-item" to="/account/orders">
                <FontAwesomeIcon icon={faHistory} />
                &nbsp; Account History
              </Link>
            </div>
          </div>
          <div className="buttons">
            <button
              className={loginButtonStyling}
              onClick={isLoggedIn ? handleClickOpen : handleLogInButton}
            >
              {loginButtonText}
            </button>
            <Link
              className={cartButtonStyling}
              style={{ width: "92px" }}
              to="/cart"
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
        <DialogTitle id="alert-dialog-title">{"LOGGING OUT"}</DialogTitle>
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
