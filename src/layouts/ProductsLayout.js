import { Outlet } from "react-router-dom"
import MovieBar from "../components/MovieBar/MovieBar"

export default function ProductsLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
