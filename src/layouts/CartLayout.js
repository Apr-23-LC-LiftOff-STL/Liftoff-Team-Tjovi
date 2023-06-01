import { Outlet } from "react-router-dom";
import MovieBar from "../components/MovieBar/MovieBar";

export default function CartLayout() {
  return (
    <div>
      <Outlet />
      <MovieBar />
    </div>
  );
}
