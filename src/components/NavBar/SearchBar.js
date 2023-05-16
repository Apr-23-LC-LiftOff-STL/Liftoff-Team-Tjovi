import { useSearchStore } from "../../store/searchStore";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div>
    <div>
      <input className="input is-size-6 is-primary" placeholder="Search Movies" onChange={handleChange}></input>
      </div>
    </div>
  );
};

export default SearchBar;
