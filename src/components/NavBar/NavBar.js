import "bulma/css/bulma.css";
import { useState, useEffect, useRef } from "react";

import SearchBar from "./SearchBar";

import logo125 from "./Logo_MovieDL_20230426_125x22.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "../../store/cartStore";

const NavBar2 = () => {
  const cart = useCartStore((state) => state.cart);
  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  const [isActive, setisActive] = useState(false);

  const [cartButtonStyling, setCartButtonStyling] = useState(
    totalProductsInCart !== 0
      ? "button is-warning is-rounded"
      : "button is-light is-rounded"
  );

  useEffect(() => {
    if (totalProductsInCart !== 0) {
      setCartButtonStyling("button is-warning is-rounded");
    } else {
      setCartButtonStyling("button is-light is-rounded");
    }
  }, [totalProductsInCart]);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
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
      
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <FontAwesomeIcon icon={faUser} />
            </a>
            <div className="navbar-dropdown is-left">
              <a className="navbar-item" href="/account/profile">
                My Profile
              </a>
              <a className="navbar-item" href="/account/orders">
                Account History
              </a>
              <hr className="navbar-divider" />
              <div className="navbar-item">Log Out</div>
            </div>
          </div>
        </div>

        <div className="buttons">
          <a className="button is-primary is-light is-rounded" href="/login">
            Log in
          </a>
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
    </nav>
  );
};

export default NavBar2;
