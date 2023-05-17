import { useSearchStore } from "../../store/searchStore";

import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";

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
    color: searchTerm === '' ? 'hsl(0, 0%, 86%)' : 'hsl(0, 0%, 48%)',
    pointerEvents: 'auto',
  };

  return (
    <div>
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-rounded has-background-white-ter"
            type="text"
            placeholder="Search Movies"
            onChange={handleChange}
            value={searchTerm}
          />
          <span className="icon is-small is-left has-text-primary">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <span
            className="icon"
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
