import "./Navbar.css";

const Navbar = (props) => {
    return (
      <div className="topnav">
        <div>
          <a href="/index">MovieDL</a>
        </div>
        <div className="topnav-right">
          <input className="search"
            type="text"
            value="Search"
            onFocus={(e) => (e.target.value = "")}
            onBlur={(e) => (e.target.value = "Search")}
          />
          <button className="go-button">Go!</button>
          <a href="/movies" className="topnav-right">
            Browse All
          </a>
          <a href="/login" className="topnav-right">
            Log In
          </a>
          <a href="/account" className="topnav-right">
            My Account
          </a>
          <a href="/cart" className="topnav-right">
            Cart
          </a>
        </div>
      </div>
    );
  };
  
  export default Navbar;