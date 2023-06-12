import { useSearchStore } from "../../store/searchStore";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";

import "./SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const handleChange = (e) => {
    navigate("/");
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  const clearSearchTermHandler = (e) => {
    setSearchTerm("");
  };

  const clearSearchTermStyleHandler = {
    color: searchTerm === "" ? "hsl(0, 0%, 96%)" : "hsl(0, 0%, 48%)",
    pointerEvents: "auto",
  };

  const searchTermStyleHandler = {
    color: searchTerm === "" ? "hsl(0, 0%, 29%)" : "hsl(171, 100%, 41%)",
    pointerEvents: "auto",
  };

  return (
    <div>
      <div className="navbar-item">
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-rounded custom-placeholder"
            style={{backgroundColor: "hsl(0, 0%, 96%)"}}
            type="text"
            placeholder="Search Movies"
            onChange={handleChange}
            value={searchTerm}
          />
          <span
            className="icon is-small is-left"
            style={searchTermStyleHandler}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <span
            className="icon is-small is-right"
            style={clearSearchTermStyleHandler}
            onClick={clearSearchTermHandler}
          >
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
