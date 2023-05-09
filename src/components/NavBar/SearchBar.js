import { useSearchStore } from "../../store/searchStore";

const SearchBar = () => {

  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <input text onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
