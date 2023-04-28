export default function Orders() {
  return (
    <div>
      <div>
      <h1 className="title">Order History</h1>
        <br></br>
        <div className="box">
          <h4>Order #400055 -- Jan 1st, 2023</h4>
          <p>Movie 1 - details, price, download code etc</p>
          <p>Movie 2 - details, price, download code etc</p>
          <p>Movie 3 - details, price, download code etc</p>
          <p>TOTAL COST</p>
        </div>
        <br></br>
        <div className="box">
          <h4>Order #303232 -- October 2nd, 2022</h4>
          <p>Movie 1 - details, price, download code etc</p>
          <p>Movie 2 - details, price, download code etc</p>
          <p>TOTAL COST</p>
        </div>
      </div>
    </div>
  );
}
