import { useState, useEffect, useRef } from "react";

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

const NavBar = () => {
  const cart = useCartStore((state) => state.cart);
  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const [isActive, setisActive] = useState(false);
  const [cartButtonStyling, setCartButtonStyling] = useState();
  const [cartDropdownStyling, setCartDropdownStyling] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav
      className="navbar pt-1 pl-4 pr-4"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo125} width="112" height="28" />
        </a>

        <a
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
        </a>
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
            <a className="navbar-link is-hidden-mobile">
              <FontAwesomeIcon icon={faUser} />
            </a>
            <div className="navbar-dropdown is-left">
              <a className="navbar-item is-hidden-desktop" href="/login">
                <span className="has-text-primary">
                  <FontAwesomeIcon icon={faRightToBracket} />
                </span>
                &nbsp; Log In
              </a>
              <a className="navbar-item is-hidden-desktop" href="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                &nbsp; Cart{" "}
                <span className={cartDropdownStyling}>
                  ({totalProductsInCart})
                </span>
              </a>
              <a className="navbar-item" href="/account/profile">
                <FontAwesomeIcon icon={faUser} />
                &nbsp; My Profile
              </a>
              <a className="navbar-item" href="/account/orders">
                <FontAwesomeIcon icon={faHistory} />
                &nbsp; Account History
              </a>
              <hr className="navbar-divider" />
              <div className="navbar-item">
                <span className="has-text-danger">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                &nbsp; Log Out
              </div>
            </div>
          </div>

          <div className="buttons">
          {isLoggedIn ? (
            <button className="button is-light" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <a className="button is-primary is-hidden-mobile" href="/login" >
              Log in
            </a>
          )}
            <a
              className={cartButtonStyling}
              style={{ width: "92px" }}
              href="/cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              &nbsp; ({totalProductsInCart})
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
