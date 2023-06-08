import { useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MovieBar from "../components/MovieBar/MovieBar";

export default function HelpLayout() {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

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
      <h1 className="title mx-6">Customer Service</h1>

      <div className="buttons has-addons mx-6">
        <button className="button is-info is-outlined" onClick={()=> navigate("./faq")}>View the FAQ</button>
        <button className="button is-info is-outlined" onClick={()=> navigate("./contact")}>Contact</button>
      </div>
      
      <Outlet />
      <MovieBar />
    </div>
  );
}
