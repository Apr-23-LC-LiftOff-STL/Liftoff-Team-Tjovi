import MovieBar from "../../components/MovieBar/MovieBar"
import OrderHistoryItem from "./OrderHistoryItem"

export default function OrderHistory() {
    return (
      <div>
      <div>
      <nav className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/account/profile" aria-current="page">My Profile</a></li>
    <li className="is-active"><a href="#" aria-current="page">Order History</a></li>
  </ul>
</nav>
      <OrderHistoryItem />
      </div>
      <MovieBar />
      </div>
    )
  }
  