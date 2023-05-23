const OrderHistoryItem = ({ date, orderNumber, totalPrice, stripeRef }) => {
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

  return (
    <div className="pt-4 mb-6">
      <div
        className="columns mx-4 mb-5"
        style={{ borderStyle: "solid", borderColor: "darkgray", borderWidth: '1px'}}
      >
        <div className="column is-2 has-background-grey has-text-white pl-4">
          <div>
            <span className="has-text-weight-bold">Order #:</span> {orderNumber}{" "}
          </div>
          <div>
            <span className="has-text-weight-bold">Date:</span> {date}
          </div>
        </div>
        <div className="column has-background-white-ter pl-4">
          <div>
            <span className="has-text-weight-bold">Invoice Total:</span> $
            {totalPrice}
          </div>
          <div>
            <span className="has-text-weight-bold">Payment Reference:</span>{" "}
            {stripeRef}
          </div>
        </div>
      </div>
      <div
        className="columns mx-4 pl-1"
        style={{ borderStyle: "solid", borderColor: "darkgray", borderWidth: '1px' }}
      >
        <div className="column">Movie 1</div>
        <div className="column">Movie 2</div>
        <div className="column">Movie 3</div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
