import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import logo125 from "../logos/Logo_MovieDL_20230426_125x22.png";

const Footer = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleBrandClick = () => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  return (
    <footer className="has-text-centered is-flex-align-items-flex-end has-background-white-ter pt-6">
      <div>
      <div className="has-text-centered pb-5">
        <div onClick={handleBrandClick}>
          <img src={logo125} />
        </div>
        <p className="is-size-7">
          5555 Delmar Blvd
          <br />
          St. Louis, MO 63108
          <br />
          (555) 555-5555
        </p>
        </div>
        <div className="tabs is-centered pb-4">
          <ul>
          <li>
              <a onClick={handleBrandClick}>
                Home
              </a>
            </li>
            <li>
              <Link to="faq">
                Customer Service
              </Link>
            </li>
            <li>
              <NavLink to="about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
