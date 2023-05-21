import { Link, useRouteError } from "react-router-dom";
import MovieBar from "../../components/MovieBar/MovieBar";

export default function ProductsError() {
  const error = useRouteError();

  return (
    <div>
      <div className="title is-3 ml-6 mt-4">{error.message}</div>
      <div>
        <p className="ml-6">
          <Link to="/">Browse Movies</Link>
        </p>
      </div>
      <MovieBar />
    </div>
  );
}
