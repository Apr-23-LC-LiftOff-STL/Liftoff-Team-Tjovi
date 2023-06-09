import { useState, useEffect } from 'react';
import OrderHistorySubItemAdmin from "./OrderHistorySubItemAdmin";
import jwtDecode from "jwt-decode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const OrderHistoryItem = ({
  orderId,
  createDt,
  email,
  totalOrderPrice,
  completedOrderItems,
  // stripeRef,
}) => {

  const [sortedOrderItems, setSortedOrderItems] = useState([]);

  useEffect(() => {
    const sortedItems = completedOrderItems.slice().sort((a, b) => a.movieId - b.movieId);
    setSortedOrderItems(sortedItems);
  }, [completedOrderItems]);

  console.log(JSON.stringify(completedOrderItems));

  return (
    <div className="py-2">
      <div
        className="px-1 has-background-info-light card"
        style={{
          borderStyle: "solid",
          borderColor: 'darkgray',
          borderWidth: "1px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-between"}}>
        <div className="has-text-left py-3 px-4" style={{flex: "0 0 auto"}}>
            <div className="title is-5 has-text-centered">
              Order #&nbsp;
              {orderId}
            </div>
            <div className="subtitle is-6 has-text-centered">{createDt}</div>
          </div>
          <div className="has-text-left py-3 px-4" style={{flex: "0 0 auto"}}>
            <div className="title is-5 has-text-centered"><FontAwesomeIcon icon={faUser} /></div>
            <div className="subtitle is-6">{email}</div>
          </div>
          <div className="has-text-left py-3 px-4" style={{marginLeft: "auto"}}>
            <div className="title is-5 has-text-centered">Invoice Total</div>
            <div className="subtitle is-6 has-text-right">${totalOrderPrice?.toFixed(2)}</div>
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
              <th className="has-text-centered menu-label">Title</th>
              <th className="has-text-right menu-label">Price</th>
              <th className="has-text-centered menu-label">Ct.</th>
              <th className="has-text- menu-label">Sub.</th>
            </tr>
          </thead>
          {sortedOrderItems?.map((orderItem) => (
            <OrderHistorySubItemAdmin
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
