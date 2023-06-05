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
    <div className="column pt-4 mb-3">
      <div
        className="columns is-vcentered has-background-primary-light card px-4 mx-4 mb-5"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <div className="column">
          <div className="has-text-weight-bold is-size-6">Order #&nbsp; 
            {orderId}
          </div>
          <div>
            <span className="has-text-weight-bold"></span> {createDt}
          </div>
        </div>

        <div className="column has-text-right">
          <div className="has-text-weight-bold">Invoice Total</div>
          <div>$
          {totalOrderPrice?.toFixed(2)}
          </div>
        </div>
      </div>

      <div
        className="columns mx-4 pl-1 card"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <table className="table is-fullwidth mx-5 my-2">
          <thead>
            <tr>
              <th className="has-text-centered"></th>
              <th className="has-text-left">Title</th>
              <th className="has-text-right">Price</th>
              <th className="has-text-centered">Count</th>
              <th className="has-text-right">Subtotal</th>
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
