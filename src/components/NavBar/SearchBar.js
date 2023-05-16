import { useSearchStore } from "../../store/searchStore";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {

  const navigate = useNavigate();

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
    navigate('/');
  }

  return (
    <div>
      <input className="input is-success is-size-6" placeHolder="Search Movies" text onChange={handleChange} />
    </div>
  );
};

export default SearchBar;

