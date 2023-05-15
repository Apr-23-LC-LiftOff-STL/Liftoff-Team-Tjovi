import MovieCards from "../components/MovieCard/MovieCards"
import GenreSelect from "../components/MovieFilterAndSort/GenreSelect/GenreSelect"
import SortBar from "../components/MovieFilterAndSort/SortBar.js"

export default function Home() {
    return (
      <div>
        <GenreSelect />
        <SortBar />
        <MovieCards />
      </div>
    )
  }
  