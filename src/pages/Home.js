import MovieCards from "../components/MovieCard/MovieCards"
import GenreSelect from "../components/MovieFilterAndSort/GenreSelect"
import SortOptions from "../components/MovieFilterAndSort/SortOptions"

export default function Home() {
    return (
      <div>
        <GenreSelect />
        <SortOptions />
        <MovieCards />
      </div>
    )
  }
  