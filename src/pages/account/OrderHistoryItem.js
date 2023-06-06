import OrderHistorySubItem from "./OrderHistorySubItem";

const OrderHistoryItem = ({
  orderId,
  createDt,
  totalOrderPrice,
  completedOrderItems,
  // stripeRef,
}) => {
  const expression = /\s[^\s]*$/;

  const createShortcut = (text, limit) => {
    if (text.length > limit) {
      const part = text.slice(0, limit - 3);
      if (part.match(expression)) {
        return part.replace(expression, "...");
      }
      return part + "...";
    }
    return text;
  };

  console.log(JSON.stringify(completedOrderItems));

  return (
    <div className="column mb-5">
      <div
        className="columns is-vcentered has-background-primary-light card"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <div className="column">
          <div className="is-size-5 has-text-weight-semibold">Order #&nbsp; 
            {orderId}
          </div>
          <div>
            <span className="has-text-weight-bold"></span> {createDt}
          </div>
        </div>

        <div className="column has-text-right">
          <div className="is-size-5 has-text-weight-semibold">Invoice Total</div>
          <div>$
          {totalOrderPrice?.toFixed(2)}
          </div>
        </div>
      </div>

      <div
        className="columns card is-centered has-background-white-ter pt-3"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <table className="table is-fullwidth">
          <thead className="has-background-white-ter">
            <tr>
              <th className="has-text-left menu-label">Items</th>
              <th className="has-text-left menu-label">Title</th>
              <th className="has-text-right menu-label">Price</th>
              <th className="has-text-centered menu-label">Count</th>
              <th className="has-text-right menu-label">Subtotal</th>
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
