import { useEffect } from 'react';
import { Link, NavLink, useRouteError, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  //const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="section">
      <div className="title is-4 ml-6">Sorry, page not found. <span className="has-text-primary">¯\_(ツ)_/¯</span></div>
          <NavLink className="button is-small is-link is-outlined ml-6" to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Browse Movies
          </NavLink>
</div>
  );
}
