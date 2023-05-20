import { NavLink, Outlet } from "react-router-dom";
import "bulma/css/bulma.css";
import MovieBar from "../components/MovieBar/MovieBar";

export default function HelpLayout() {
  return (
    <div className="help-layout">
      <h1 className="title">Customer Service</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quas
        debitis quibusdam deserunt repellat hic molestias ipsum commodi aut
        odit!
      </p>

      <nav>
        <NavLink to="faq" className="button is-light">
          View the FAQ
        </NavLink>
        <NavLink to="contact" className="button is-light">
          Contact Us
        </NavLink>
      </nav>
      <Outlet />
      <MovieBar />
    </div>
  );
}
