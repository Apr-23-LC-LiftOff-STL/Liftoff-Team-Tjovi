import "bulma/css/bulma.css";

import SearchBar from "./SearchBar";
import GenreSelect from "./GenreSelect/GenreSelect";
import logo125 from "./Logo_MovieDL_20230426_125x22.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  
  return (
    <nav className="navbar is-" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo125} width="112" height="28" />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          // TODO: add functionality and styling for burger menu
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <form className="navbar-start" action="" method="get">
              <SearchBar />
              <GenreSelect />
              <input className="button is-light" type="submit" value="Search" />
            </form>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/register">
                Register
              </a>
              <a className="button is-light" href="/login">
                Log in
              </a>
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link">Account &nbsp; <FontAwesomeIcon icon={faUser} /></a>
                  <div className="navbar-dropdown is-right">
                    <a className="navbar-item" href="/account/profile">My Profile</a>
                    <a className="navbar-item" href="/account/orders">Account History</a>
                    <hr className="navbar-divider" />
                    <div className="navbar-item">Log Out</div>
                </div>
              </div>
              <a className="button is-light" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
