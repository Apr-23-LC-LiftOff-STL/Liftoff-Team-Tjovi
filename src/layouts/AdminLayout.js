import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import Login from "../pages/account/Login";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeButton, setActiveButton] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("../login");
    } else if (token) {
      const decodedToken = jwtDecode(token);
      const authorities = decodedToken.authorities;
      if (authorities.includes("ROLE_ADMIN")) {
        setIsAdmin(authorities.includes("ROLE_ADMIN"));
      } else {
        navigate("/");
      }
    }
  }, []);

  const handleProductsButton = () => {
    setActiveButton("productsButton");
    navigate("products");
  };

  const handleOrdersButton = () => {
    setActiveButton("ordersButton");
    navigate("orders");
  };

  useEffect(() => {
    if (location.pathname === "/admin") {
      setActiveButton(null);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <div className="pl-6 pt-2 pb-2 has-background-white-ter">
        <div class="field is-grouped is-grouped-left">
          <p class="control">
            <div className="title is-4 has-text-danger pb-1">ADMIN PORTAL</div>
          </p>
          <p class="control">
            <div
              className={
                activeButton === "ordersButton"
                  ? "button is-small is-info"
                  : "button is-small"
              }
              onClick={handleOrdersButton}
            >
              ORDER REVIEW
            </div>
          </p>
          <p class="control">
            <div
              className={
                activeButton === "productsButton"
                  ? "button is-small is-info"
                  : "button is-small"
              }
              onClick={handleProductsButton}
            >
              PRODUCT EDIT
            </div>
          </p>
        </div>
      </div>
      {!activeButton ? (
        <div>
          <div className="is-size-5 px-6 py-3 has-background-info-light">
            Welcome to the Admin Portal. Please select one of the above options.
          </div>
          <div className="section is-large"></div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
