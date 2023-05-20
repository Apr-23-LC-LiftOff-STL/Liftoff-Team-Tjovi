import { NavLink } from "react-router-dom"
import MovieBar from "../components/MovieBar/MovieBar"

export default function NotFound() {
  return (
    <div>
    <div>
      <h1 className="title">Page Not Found!</h1>
      <p>Nothing to see here! <NavLink to="/">Click here to return home</NavLink>.</p>
    </div>
    <MovieBar />
    </div>
  )
}
