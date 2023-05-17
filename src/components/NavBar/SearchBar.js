import { useSearchStore } from "../../store/searchStore";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const navigate = useNavigate();

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const handleChange = (e) => {
    navigate("/");
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input is-success is-rounded has-background-white-ter"
            type="text"
            placeholder="Search Movies"
            onChange={handleChange}
          />
          <span className="icon is-small is-left has-text-primary">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          {/*     <span class="icon is-small is-right">
    <FontAwesomeIcon icon={faX} /></span> */}
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
