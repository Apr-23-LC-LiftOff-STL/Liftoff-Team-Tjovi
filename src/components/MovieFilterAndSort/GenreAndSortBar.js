import SortButtons from "./SortButtons";
import GenreSelect from "./GenreSelect";
import ChatBotDialog from "./ChatBotDialog"

const GenreAndSortBar = () => {
  return (
    <div className="ml-5"
    >
      <SortButtons />
      <GenreSelect />
    </div>
  );
};

export default GenreAndSortBar;