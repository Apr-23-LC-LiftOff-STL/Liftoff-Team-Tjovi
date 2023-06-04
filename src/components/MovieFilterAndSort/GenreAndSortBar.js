import SortButtons from "./SortButtons";
import GenreSelect from "./GenreSelect";
import ChatBotDialog from "./ChatBotDialog"

const GenreAndSortBar = () => {
  return (
    <div className="mx-5"
    >
      <SortButtons />
      <GenreSelect />
      <ChatBotDialog />
    </div>
  );
};

export default GenreAndSortBar;