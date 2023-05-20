import { Link, useRouteError } from "react-router-dom"
import MovieBar from "../../components/MovieBar/MovieBar"

export default function ProductsError() {
  const error = useRouteError()

  return (
    <div>
    <div className="products-error">
      <h2>Error</h2>
      <p>{error.message}</p>
      <Link to="/">Back to the Homepage</Link>
    </div>
    <MovieBar />
    </div>
  )
}
