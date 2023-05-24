import SortButtons from "./SortButtons";
import GenreSelect from "./GenreSelect";

const GenreAndSortBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        paddingLeft: "25px",
      }}
    >
      <SortButtons />
      <GenreSelect />
    </div>
  );
};

export default GenreAndSortBar;
