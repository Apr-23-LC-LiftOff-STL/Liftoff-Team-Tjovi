import { NavLink } from "react-router-dom"
import MovieBar from "../components/MovieBar/MovieBar"

export default function NotFound() {
  return (
    <div>
    <div>
    <div className="title is-3 ml-6 mt-4 has-text-danger">Page Not Found!</div>
      <p className="ml-6 is-italic">Nothing to see here! <NavLink to="/">Click here to return home</NavLink>.</p>
    </div>
    <MovieBar />
    </div>
  )
}
