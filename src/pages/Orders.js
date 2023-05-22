import MovieBar from "../components/MovieBar/MovieBar"

export default function Orders() {
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
          <li className="is-active">
            <a href="#" aria-current="page">
              Account History
            </a>
          </li>
        </ul>
      </nav>
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
      <MovieBar />
    </div>
  );
}
