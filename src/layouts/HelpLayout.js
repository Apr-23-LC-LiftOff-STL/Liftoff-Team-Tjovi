import { NavLink, Outlet } from "react-router-dom";

import MovieBar from "../components/MovieBar/MovieBar";

export default function HelpLayout() {
  return (
    <div className="help-layout">
               <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Customer Service
            </a>
          </li>
        </ul>
      </nav>
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
