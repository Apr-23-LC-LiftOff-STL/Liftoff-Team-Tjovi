import { useSearchStore } from "../../store/searchStore";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {

  const navigate = useNavigate();

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const handleChange = (e) => {
    navigate('/');
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
    <div className="field">
  <p className="control has-icons-left has-icons-right">
    <input className="input is-success" type="text" placeholder="Search Movies" onChange={handleChange}/>
    <span className="icon is-small is-left"><FontAwesomeIcon icon={faSearch} /></span>
{/*     <span class="icon is-small is-right">
    <FontAwesomeIcon icon={faX} /></span> */}
  </p>
</div>
    </div>
  );
};

export default SearchBar;

