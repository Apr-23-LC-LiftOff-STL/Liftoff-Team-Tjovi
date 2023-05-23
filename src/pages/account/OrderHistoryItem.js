const OrderHistoryItem = () => {
  const date = "2022-03-01";
  const orderNumber = "ASDF345";
  const total = "68.89";
  const stripeRef = "$5sdf5%-";

  return (
    <div className="pt-4">
      <div className="columns mx-6 mb-5" style={{borderStyle: 'solid', borderColor: 'darkgray'}}>
          <div className="column is-2 has-background-grey has-text-white pl-4">
            <div><span className="has-text-weight-bold">Order #:</span> {orderNumber} </div>
            <div><span className="has-text-weight-bold">Date:</span> {date}</div>
          </div>
          <div className="column has-background-white-ter pl-4">
            <div><span className="has-text-weight-bold">Invoice Total:</span> ${total}</div>
            <div><span className="has-text-weight-bold">Payment Reference:</span> {stripeRef}</div>
          </div>
        </div>
        <div className="columns mx-6" style={{borderStyle: 'solid', borderColor: 'darkgray'}}>
        
        <div className="column">Movie 1</div>
        <div className="column">Movie 2</div>
        <div className="column">Movie 3</div>
      </div>
      </div>
  );
};

export default OrderHistoryItem;
