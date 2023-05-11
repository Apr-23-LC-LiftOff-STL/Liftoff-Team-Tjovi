import { Outlet, NavLink } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer"

export default function RootLayout() {
  return (
    <div class="root-layout">
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
