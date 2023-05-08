import { Outlet, NavLink } from "react-router-dom";
import "bulma/css/bulma.css";
import logo125 from "./Logo_MovieDL_20230426_125x22.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <NavLink to="/">
          <img src={logo125} />
        </NavLink>
        <p className="is-size-7">
          4811 Delmar Blvd
          <br />
          St. Louis, MO 63108
          <br />
          (314) 254-0107
        </p>
        <div class="tabs is-centered">
          <ul>
            <li>
              <NavLink className="card-footer-item" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="card-footer-item" to="help">
                Customer Service
              </NavLink>
            </li>
            <li>
              <NavLink className="card-footer-item" to="about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="content has text-centered"></div>
      </div>
    </footer>
  );
};

export default Footer;
