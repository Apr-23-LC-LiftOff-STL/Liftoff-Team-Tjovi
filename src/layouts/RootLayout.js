import { Outlet, NavLink } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

export default function RootLayout() {
  return (
    <div className="root-layout">
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
