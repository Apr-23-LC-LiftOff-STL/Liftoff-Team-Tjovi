import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import axios from "axios";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function CheckoutSuccess() {
  const cartUser = useCartStore((state) => state.cartUser);
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

  //let date = new Date();
  // {date.toLocaleString()}

  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  // MW - how to get total, cart etc if emptyCart() triggers on component mount after post req?
  // POSSIBLE SOLUTION:  consider POST then GET from DB order table.  Likely!

  // Make a GET request to retrieve order history

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const cartItem of cart) {
        try {
          const response = await axios.get(
            `http://localhost:8080/movies/${cartItem.id}`
          );
          const { title, releaseDate, posterPath, price } = response.data;
          data[cartItem.id] = { title, releaseDate, posterPath, price };
        } catch (error) {
          console.log(
            `Error fetching data for product with ID ${cartItem.id}:`,
            error
          );
        }
      }
      setProductData(data);
    };
    fetchData();
  }, [cart]);

  const allItemsSubtotal = cart.reduce((total, item) => {
    const data = productData[item.id] || {};
    const itemSubtotal = item.count * data.price;
    return total + itemSubtotal;
  }, 0);

  const searchQuery = "amount[gte]=5000";

  useEffect(() => {
    const sendOrderData = async () => {
      try {
        await axios.post("http://localhost:8080/order/newOrder/" + cartUser);
        console.log(cartUser);
        console.log(cart);
        console.log("POSTING ORDER DATA")
      } catch (error) {
        console.error("Error posting purchase to DB");
      }
    };
  
    const getOrderData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/order/history/" + cartUser
        );
        const orderData = response.data;
        console.log("GETTING ORDER DATA")
        console.log(JSON.stringify(orderData));
      } catch (error) {
        console.error("Error getting order history");
      }
    };
    /*     axios
      .get("https://api.stripe.com/v1/charges?" + searchQuery, {
        headers: {
          Authorization:
            "Bearer sk_test_51N8n2ODvHmrdraF8ov56fzzBxwokVlEvCMG8tHuBBZZCdWZT39hK9QYonV7aHiT0UwOUgsBgWTJOe97UgHBwxEoH000oqXg4Qu",
        },
      })
      .then((response) => {
        // Handle the successful response
        const search_result = response.data.data;
        console.log("Stripe data:");
        console.log(search_result);
        // Process or display the order history as needed
      })
      .catch((error) => {
        // Handle the error
        console.error("Error retrieving order history:", error);
      }); */
/*       sendOrderData();
      emptyCart(); */
      getOrderData();
    }, []);

  return (
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
              Checkout Success
            </a>
          </li>
        </ul>
      </nav>
      <div className="columns is-centered">
        <div className="column is-8 mx-6">
          <div
            className="box px-6 pb-6"
            style={{
              borderStyle: "solid",
              borderColor: "lightgray",
              borderWidth: "1px",
              boxShadow: "0 8px 16px 4px hsl(171, 100%, 41%, 0.3)",
            }}
          >
            <div className="title is-3 mt-5 has-text-weight-semibold">
              Purchase Confirmation
              <span className="is-pulled-right">
                <img src={logo125}></img>
              </span>
            </div>
            <div className="pt-4 mb-6">
              <div
                className="columns mx-1"
                style={{
                  borderStyle: "solid",
                  borderColor: "darkgray",
                  borderWidth: "1px",
                }}
              >
                <div className="column is-5 has-background-grey has-text-white pl-4">
                  <div>
                    <span className="has-text-weight-bold">User: </span>
                    {cartUser ? cartUser : "GUEST"}
                  </div>
                  <div>
                    <span className="has-text-weight-bold">Order #:</span>{" "}
                  </div>
                  <div>
                    <span className="has-text-weight-bold">Date:</span>{" "}

                  </div>
                </div>
                <div className="column has-background-white-ter pl-4">
                  <div>
                    <span className="has-text-weight-bold">Invoice Total:</span>{" "}
                    ${allItemsSubtotal}
                  </div>
                  <div>
                    <span className="has-text-weight-bold">
                      Payment Reference:
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div
                className="columns mx-4 pl-1"
                style={{
                  borderStyle: "solid",
                  borderColor: "darkgray",
                  borderWidth: "1px",
                }}
              >
                <div className="column">Movie 1</div>
                <div className="column">Movie 2</div>
                <div className="column">Movie 3</div>
              </div>
            </div>

            <div>$ *** purchaseTotal ***</div>
            <br />
            <hr></hr>
            {cartUser ? (
              <div className="has-text-centered is-italic">
                View your{" "}
                <NavLink to="../account/orders">Order History</NavLink>
              </div>
            ) : (
              <div className="has-text-centered is-danger">
                Please print this page for your records!
                <div>Guest users do not have access to account history.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
