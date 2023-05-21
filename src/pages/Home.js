import MovieCards from "../components/MovieCard/MovieCards"
import GenreAndSortBar from "../components/MovieFilterAndSort/GenreAndSortBar"
import GenreSelect from "../components/MovieFilterAndSort/GenreSelect"
import SortButtons from "../components/MovieFilterAndSort/SortButtons"

export default function Home() {
    return (
      <div>
        <GenreAndSortBar />
        <MovieCards />
      </div>
    )
  }
  