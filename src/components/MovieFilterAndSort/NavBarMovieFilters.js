import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import GenreSelect from "./GenreSelect";
import MovieCardsPerPageSelect from "./MovieCardsPerPageSelect";
import SortButtons from "./SortButtons";

export default function NavBarMovieFilters() {
  return (
    <Box className="pt-2 pl-2">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          marginTop: "-4px",
          marginBottom: "-4px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <MovieCardsPerPageSelect />
            <GenreSelect />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
