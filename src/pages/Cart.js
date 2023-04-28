export default function Account() {
  return (
    <div>
      <div>
        <div>
          <h1 className="title">Your Cart</h1>
          <br></br>
          <p className="box">Movie 1 - details, price, (# of same item?) [X]</p>
          <button class="delete"></button>
          <p className="box">Movie 2 - details, price (# of same item?) [X]</p>
          <button class="delete"></button>
          <p className="box">Movie 3 - details, price, (# of same item?) [X]</p>
          <button class="delete"></button>
        </div>
        <br></br>
      </div>
      <div className="box">
        <p>Total Items in Cart: 3</p>
        <p>Total Price: $54.99</p>
      </div>
      <button className="button is-primary">Complete Purchase</button>
    </div>
  );
}
