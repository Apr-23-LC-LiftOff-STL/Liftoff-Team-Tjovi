import MovieCards from "../components/MovieCard/MovieCards";
import SortButtons from "../components/MovieFilterAndSort/SortButtons";
import GenreSelect from "../components/MovieFilterAndSort/GenreSelect";
import MovieCardsPerPageSelect from "../components/MovieFilterAndSort/MovieCardsPerPageSelect";

export default function Home() {
  return (
    <div>
      <div className="ml-4">
        <SortButtons />
        <div style={{ display: "flex" }}>
          <GenreSelect />
          <MovieCardsPerPageSelect />
        </div>
      </div>
      <MovieCards />
    </div>
  );
}
