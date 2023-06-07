import OrderHistoryItem from "./OrderHistoryItem";
import OrderHistoryNoneFound from "./OrderHistoryNoneFound";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function OrderHistory() {
  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [sortFirstLastFlag, setSortFirstLastFlag] = useState(false);
  console.log(JSON.stringify(orderData));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const orders = [
    {
      date: "2022-03-01",
      orderNumber: "ASDF345",
      totalPrice: "68.89",
      stripeRef: "$5sdf5%-",
    },
    {
      date: "2023-01-29",
      orderNumber: "QB-234s",
      totalPrice: "15.00",
      stripeRef: "=$sdf234S",
    },
  ];

  const token = localStorage.getItem("token");
  const userData = token ? jwtDecode(token) : null;
  const cartUser = userData?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/order/history/" + cartUser
        );
        console.log(cartUser);
        const orderData = response.data;
        orderData.sort((b, a) => {
          return a.id - b.id;
        });
        setOrderData(orderData);
      } catch (error) {
        console.error("Error getting order history:", error);
      }
    };
    fetchData();
  }, []);

  const handleSortFirstLast = () => {
    const sortedData = [...orderData].sort((b, a) => {
      return b.id - a.id;
    });
    setOrderData(sortedData);
    setSortFirstLastFlag(true);
  };

  const handleSortLastFirst = () => {
    const sortedData = [...orderData].sort((b, a) => {
      return a.id - b.id;
    });
    setOrderData(sortedData);
    setSortFirstLastFlag(false);
  };

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
            <li>
              <a href="/account/profile" aria-current="page">
                My Profile
              </a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                Order History
              </a>
            </li>
          </ul>
        </nav>
        <div className="title ml-6">Order History</div>
        <div className="columns">
          <div className="column"></div>
          <div className="column is-two-thirds mx-4">
            <div
              className="button is-info is-small is-light is-outlined mb-1 ml-2"
              onClick={() =>
                !sortFirstLastFlag
                  ? handleSortFirstLast()
                  : handleSortLastFirst()
              }
            >
              Sort By Order &nbsp;
              {!sortFirstLastFlag ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
            </div>
            {orderData.length > 0 ? (
              orderData.map((order) => (
                <div key={order.id}>
                  <OrderHistoryItem
                    orderId={order.id}
                    createDt={order.createDt}
                    totalOrderPrice={order.totalOrderPrice}
                    completedOrderItems={order.completedOrderItems}
                  />
                </div>
              ))
            ) : (
              <OrderHistoryNoneFound />
            )}
          </div>
          <div className="column"></div>
        </div>
      </div>
    </div>
  );
}
