import MovieCards from "../components/MovieCard/MovieCards"
import GenreSelect from "../components/MovieFilterAndSort/GenreSelect"
import SortOptions from "../components/MovieFilterAndSort/SortButtons"
import GenreAndSortBar from "../components/MovieFilterAndSort/GenreAndSortBar"

export default function Home() {
    return (
      <div>
        <GenreAndSortBar />
        <MovieCards />
      </div>
    )
  }
  