import { useState, useEffect } from "react";

import axios from "axios";

import { useCartStore } from "../../store/cartStore";

import CheckoutInv from "./CheckoutInv";
import CheckoutInvItem from "./CheckoutInvItem";
import MovieBar from "../../components/MovieBar/MovieBar";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import LoadingOverlay from "./LoadingOverlay";

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);

  const [productData, setProductData] = useState({});

  const allItemsSubtotal = cart.reduce((total, item) => {
    const data = productData[item.id] || {};
    const itemSubtotal = item.count * data.price;
    return total + itemSubtotal;
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const cartItem of cart) {
        try {
          const response = await axios.get(
            `http://localhost:8080/${cartItem.id}`
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

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }
    setLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const response = await fetch("http://localhost:8080/checkout", {
      method: "POST",
    });
    const { client_secret: clientSecret } = await response.json();
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: "http://localhost:3000/checkout-success" },
    });
    if (error) {
      handleError(error);
    } else {
      setLoading(false);

      // redirect here
      // can call elements.update to update amount
    }
  };
  return (
    <div>
      <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a href="/" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <a href="./cart">Shopping Cart</a>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Checkout
            </a>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="columns is-centered">
        <div className="column is-6 mx-4">
            <CheckoutInv />
          </div>
          <div className="column is-one-third mx-4">
            <div>
              <form onSubmit={handleSubmit}>
                <PaymentElement />
                {errorMessage && <div>{errorMessage}</div>}
                {loading && <LoadingOverlay />}
                <br />
                <button
                  className="button is-normal is-danger is-pulled-right has-text-weight-semibold"
                  disabled={loading}
                >
                  Complete Purchase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MovieBar />
    </div>
  );
};

export default Checkout;
