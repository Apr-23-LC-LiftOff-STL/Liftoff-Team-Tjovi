import { Outlet } from "react-router-dom";
import MovieBar from "../components/MovieBar/MovieBar";

export default function LoginLayout() {
  return (
    <div>
      <Outlet />
      <MovieBar />
    </div>
  );
}
