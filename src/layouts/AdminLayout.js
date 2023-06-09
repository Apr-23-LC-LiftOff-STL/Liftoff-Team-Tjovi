import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Products from "../pages/products/Products";
import OrderHistoryAdmin from "../pages/account/OrderHistoryAdmin";
import MovieCards from "../components/MovieCard/MovieCards";

export default function AdminLayout() {
  const [activeButton, setActiveButton] = useState();

  const navigate = useNavigate();
  const location = useLocation();

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


  return (
    <div>
      <div className="pl-6 pt-2 pb-2 has-background-white-ter">
        <div class="field is-grouped is-grouped-left">
            <p class="control">
              <div className="title is-4 has-text-danger pb-1">
                ADMIN PORTAL
              </div>
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
      <div className="section is-small is-size-6">Please select one of the above options.

      </div>
    ) : (
      <Outlet />
    )}
    </div>
  );
}
