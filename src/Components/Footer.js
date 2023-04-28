import { Outlet, NavLink } from "react-router-dom";
import "bulma/css/bulma.css";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="content has-text-centered"></div>
      <div class="columns">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column">
          <strong>MovieDL</strong>
          <p>4811 Delmar Blvd, St. Louis, MO 63108</p>
          <p>(314) 254-0107</p>
        </div>
        <div class="column">
          <br></br>
          <div>
            <NavLink to="help">Customer Service</NavLink>
          </div>
          <div>
            <NavLink to="about">About</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
