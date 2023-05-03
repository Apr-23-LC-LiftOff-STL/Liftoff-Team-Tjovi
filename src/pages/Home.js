import MovieCards from "../components/MovieCard/MovieCards"
import SortBar from "../components/SortBar.js"
import ProductShow from "../components/ProductShow/ProductShow"

export default function Home() {
    return (
      <div>
      <SortBar />
        <MovieCards />
      </div>
    )
  }
  