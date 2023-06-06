import OrderHistorySubItem from "./OrderHistorySubItem";
import jwtDecode from "jwt-decode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const OrderHistoryItem = ({
  orderId,
  createDt,
  totalOrderPrice,
  completedOrderItems,
  // stripeRef,
}) => {
  console.log(JSON.stringify(completedOrderItems));

  const token = localStorage.getItem("token");
  const userData = token ? jwtDecode(token) : null;
  const cartUser = userData?.username;


  return (
    <div className="py-2">
      <div
        className="p-2 has-background-info-light card"
        style={{
          borderStyle: "solid",
          borderColor: 'darkgray',
          borderWidth: "1px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-between"}}>
        <div className="has-text-left card is-shadowless has-background-grey-lighter py-3 px-4" style={{flex: "0 0 auto", borderStyle: 'solid', borderColor: 'darkgray', borderWidth: "1px"}}>
            <div className="title is-6 has-text-centered">
              Order #&nbsp;
              {orderId}
            </div>
            <div className="subtitle is-6 has-text-centered">{createDt}</div>
          </div>
          <div className="has-text-left card is-shadowless has-background-grey-lighter py-3 px-4" style={{flex: "0 0 auto", borderStyle: 'solid', borderColor: 'darkgray', borderWidth: "1px"}}>
            <div className="title is-6 has-text-centered"><FontAwesomeIcon icon={faUser} /></div>
            <div className="subtitle is-6">{cartUser}</div>
          </div>
          <div className="has-text-left card is-shadowless has-background-grey-lighter py-3 px-4" style={{marginLeft: "auto", borderStyle: 'solid', borderColor: 'darkgray', borderWidth: '1px'}}>
            <div className="title is-6 has-text-centered">Invoice Total</div>
            <div className="subtitle is-6 has-text-centered">${totalOrderPrice?.toFixed(2)}</div>
          </div>

        </div>
      </div>

      <div
        className="card"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <table className="table is-fullwidth">
          <thead className="has-background-white-ter">
            <tr>
              <th className="has-text-left menu-label"></th>
              <th className="has-text-centered menu-label">Title</th>
              <th className="has-text-right menu-label">Price</th>
              <th className="has-text-centered menu-label">Ct.</th>
              <th className="has-text-left menu-label">Sub.</th>
              <th className="has-text-centered menu-label">DL</th>
            </tr>
          </thead>
          {completedOrderItems.map((orderItem) => (
            <OrderHistorySubItem
              key={orderItem.orderedItemId}
              movieId={orderItem.movieId}
              count={orderItem.quantity}
              totalPrice={orderItem.totalPrice}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
