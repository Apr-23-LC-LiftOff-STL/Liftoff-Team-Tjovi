import { useState, useEffect, useLocation } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MovieBar from "../components/MovieBar/MovieBar";

export default function HelpLayout() {
  const [activeButton, setActiveButton] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleFaqButton = () => {
    setActiveButton("faqButton");
    navigate("./faq");
  };

  const handleContactButton = () => {
    setActiveButton("contactButton");
    navigate("./contact");
  };

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
        <button
          className={
            activeButton === "faqButton"
              ? "button is-info"
              : "button is-info is-outlined"
          }
          onClick={handleFaqButton}
        >View the FAQ
        </button>
        <button
          className={
            activeButton === "contactButton"
              ? "button is-info"
              : "button is-info is-outlined"
          }
          onClick={handleContactButton}
        >
          Contact
        </button>
      </div>

      <Outlet />
      <MovieBar />
    </div>
  );
}
