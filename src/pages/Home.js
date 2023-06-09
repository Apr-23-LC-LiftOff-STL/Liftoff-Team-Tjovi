import MovieCards from "../components/MovieCard/MovieCards"
import GenreAndSortBar from "../components/MovieFilterAndSort/GenreAndSortBar"


export default function Home() {
    return (
      <div>
        <GenreAndSortBar />
        <MovieCards />
      </div>
    )
  }
  