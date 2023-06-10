import OrderHistoryItemAdmin from "./OrderHistoryItemAdmin";
import OrderHistoryNoneFound from "./OrderHistoryNoneFound";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import { Box } from "@mui/material";
import { Pagination } from "@mui/material";

export default function OrderHistoryAdmin() {
  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const navigate = useNavigate();

  const [orderData, setOrderData] = useState([]);
  const [sortFirstLastFlag, setSortFirstLastFlag] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [sortFirstLastFlag]);
  const ordersPerPage = 10;

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };

  console.log(JSON.stringify(orderData));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const token = localStorage.getItem("token");
  const userData = token ? jwtDecode(token) : null;
  const cartUser = userData?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/allOrdersHistory"
        );
        console.log(cartUser);
        const orderData = response.data;
        orderData.sort((b, a) => {
          return a.id - b.id;
        });
        setOrderData(orderData);
        setTotalElements(orderData.length);
        const totalRevenue = orderData.reduce(
          (total, order) => total + order.totalOrderPrice,
          0
        );
        setTotalRevenue(totalRevenue);
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
        <div className="columns">
          <div className="column"></div>
          <div className="column is-two-thirds mx-4">
            <div className="container mx-3 mb-1">
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "left",
                  flex: "1 1 auto",
                }}
              >
                <div
                  className="button is-small is-warning mr-4"
                  style={{
                    flex: "0 1 auto",
                    borderStyle: "solid",
                    borderColor: "darkgray",
                    borderWidth: "1px",
                  }}
                  onClick={() =>
                    !sortFirstLastFlag
                      ? handleSortFirstLast()
                      : handleSortLastFirst()
                  }
                >
                  Sort By Order &nbsp;
                  {!sortFirstLastFlag ? (
                    <FontAwesomeIcon icon={faArrowUp} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} />
                  )}
                </div>

                <Pagination
                  disableRipple
                  count={Math.ceil(orderData.length / ordersPerPage)}
                  page={page + 1}
                  onChange={handleChangePage}
                  siblingCount={1}
                  boundaryCount={1}
                  shape="rounded"
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginLeft: "auto",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="is-size-7 has-text-right has-background-white-ter py-1 px-2"
                    style={{
                      flex: "0 1 auto",
                      borderStyle: "solid",
                      borderColor: "darkgray",
                      borderWidth: "1px",
                    }}
                  >
                    Order Ct:{" "}
                    <span className="has-text-weight-semibold">
                      {totalElements}
                    </span>
                  </div>
                  <div
                    className="is-size-7 has-text-right has-background-white-ter py-1 px-2"
                    style={{
                      flex: "0 1 auto",
                      borderStyle: "solid",
                      borderColor: "darkgray",
                      borderWidth: "1px",
                    }}
                  >
                    Total Revenue:{" "}
                    <span className="has-text-weight-semibold">
                      ${totalRevenue?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Box>
            </div>
            {orderData.length > 0 ? (
              orderData
                .slice(page * ordersPerPage, (page + 1) * ordersPerPage)
                .map((order) => (
                  <div key={order.id}>
                    <OrderHistoryItemAdmin
                      orderId={order.id}
                      createDt={order.createDt}
                      email={order.email}
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
