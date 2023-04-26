import "bulma/css/bulma.css";
import mainLogo from "./Logo_MovieDL_20230426.png";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            src={mainLogo}
            width="112"
            height="28"
          />
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
          <a className="navbar-item" href="/">
            Browse All
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Genre Select</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">Genre 1</a>
              <a className="navbar-item">Genre 2</a>
              <a className="navbar-item">Genre 3</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Surprise me!</a>
            </div>
          </div>

          <div className="navbar-item">
            <form className="navbar-start" action="" method="get">
              <input
                className="navbar-start"
                type="text"
                maxlength="128"
              ></input>
              <input className="button is-light" type="submit" value="Search" />
            </form>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/register">
                <strong>Register</strong>
              </a>
              <a className="button is-light" href="login">
                Log in
              </a>
              <a className="button is-light" href="/cart">
                🛒
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
