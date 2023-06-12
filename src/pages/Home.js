import MovieCards from "../components/MovieCard/MovieCards";
import SortButtons from "../components/MovieFilterAndSort/SortButtons";
import GenreSelect from "../components/MovieFilterAndSort/GenreSelect";
import MovieCardsPerPageSelect from "../components/MovieFilterAndSort/MovieCardsPerPageSelect";
import NavBarMovieFilters from "../components/MovieFilterAndSort/NavBarMovieFilters";

export default function Home() {
  return (
    <div>
    <NavBarMovieFilters />
      <MovieCards />
    </div>
  );
}
