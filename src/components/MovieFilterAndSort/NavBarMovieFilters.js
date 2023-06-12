import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import GenreSelect from "./GenreSelect";
import MovieCardsPerPageSelect from "./MovieCardsPerPageSelect";
import SortButtons from "./SortButtons";

export default function NavBarMovieFilters() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "0.25rem"
        }}
      >
        <MovieCardsPerPageSelect />
        <GenreSelect />
      </Box>
    </div>
  );
}
