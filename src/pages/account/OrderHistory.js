import MovieBar from "../../components/MovieBar/MovieBar";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory() {
  
  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const orders = [
    {
      date: "2022-03-01",
      orderNumber: "ASDF345",
      totalPrice: "68.89",
      stripeRef: "$5sdf5%-",
    },
    {
      date: "2023-01-29",
      orderNumber: "QB-234s",
      totalPrice: "15.00",
      stripeRef: "=$sdf234S",
    }
  ];

  return (
    <div>
      <div>
        <nav
          className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/account/profile" aria-current="page">
                My Profile
              </a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                Order History
              </a>
            </li>
          </ul>
        </nav>
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <OrderHistoryItem
                orderNumber={order.orderNumber}
                date={order.date}
                totalPrice={order.totalPrice}
                stripeRef={order.stripeRef}
              />
            </div>
          ))}
        </div>
      </div>
      <MovieBar />
    </div>
  );
}
