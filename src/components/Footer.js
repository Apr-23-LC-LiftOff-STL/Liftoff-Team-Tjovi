import { Outlet, NavLink, Link } from "react-router-dom";
import logo125 from "../logos/Logo_MovieDL_20230426_125x22.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="has-text-centered is-flex-align-items-flex-end has-background-white-ter pt-5">
      <div className="content">
        <NavLink to="/">
          <img src={logo125} />
        </NavLink>
        <p className="is-size-7">
          5555 Delmar Blvd
          <br />
          St. Louis, MO 63108
          <br />
          (555) 555-5555
        </p>
        <div className="tabs is-centered pr-5">
          <ul>
          <li>
              <Link className="card-footer-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="card-footer-item" to="faq">
                Customer Service
              </Link>
            </li>
            <li>
              <NavLink className="card-footer-item" to="about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="card-footer-item" to="admin">
                Admin
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
