import { Outlet, NavLink } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer"

export default function RootLayout() {
  return (
    <div className="columns is-flex-direction-column is-fullheight-100vh" style={{minHeight: '100vh'}}>
      <header className="column is-narrow">
        <nav>
          <NavBar />
        </nav>
        </header>
      <main className="column">
        <Outlet />
      </main>
      <footer className="column is-narrow">
      <Footer />
      </footer>
    </div>
  )
}
