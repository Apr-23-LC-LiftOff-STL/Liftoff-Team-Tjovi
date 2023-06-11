import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import jwtDecode from "jwt-decode";

import CheckoutInv from "./CheckoutInv";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useCartStore } from "../../store/cartStore";

import LoadingOverlay from "./LoadingOverlay";

const stripePromise = loadStripe(
  "pk_test_51N8n2ODvHmrdraF8Eb3aQ9m86ueHPsypNotvydB9gIsrlxlpyVbah3R3Zt0L1Al5swbbXNzkDHmUmfXuKjH70fmc00Q2jPmqAa"
);
let amount;
function renderStripe(total) {
  if (total > 0) {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          // passing the client secret obtained from the server
          mode: "payment",
          currency: "usd",
          amount: total,
          // cartResults.reduce((total,item)=> {
          // return total + item.data.price
          //    },0) *100,
        }}
      >
        <StripeCheckout />
      </Elements>
    );
  }
}

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userData = token ? jwtDecode(token) : null;
  const cartUser = userData?.username;

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  if (totalProductsInCart < 1) {
    navigate("/");
  }

  const allItemsSubtotal = cart.reduce((total, item) => {
    const data = productData[item.id] || {};
    const itemSubtotal = item.count * data.price;
    const finalPrice = Math.ceil(total + itemSubtotal * 100);

    return isNaN(finalPrice) ? 0 : finalPrice;
  }, 0);

  amount = allItemsSubtotal;
  console.log(allItemsSubtotal);

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const cartItem of cart) {
        try {
          const response = await axios.get(
            `http://localhost:8080/movies/${cartItem.id}`
          );
          const { price } = response.data;
          data[cartItem.id] = { price };
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
            <a href="cart">Shopping Cart</a>
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
            {/* {
             cartResults &&
             cartResults.every(({status})=> status==="success" ) &&
              cartResults.length > 0
             && */}
            {renderStripe(allItemsSubtotal)}
          </div>
        </div>
      </div>
    </div>
  );
};
function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const token = localStorage.getItem("token");
  const userData = token ? jwtDecode(token) : null;
  const cartUser = userData?.username;

  const sendOrderData = async () => {
    try {
      await axios.post(
        "http://localhost:8080/order/newOrder/" + cartUser
      );
      console.log(cartUser);
      console.log(cart);
    } catch (error) {
      console.error("Error posting purchase to DB");
    }
  };

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
    const checkoutBackEnd = "http://localhost:8080/checkout?amount=" + amount;
    //ammount needs to go here
    //create pending order where you end product ids
    //when hits checkout success put query params
    const response = await axios(checkoutBackEnd, {
      method: "GET",
      // headers: {
      //   'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNb3ZpZURMIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJnbTJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2ODUzOTQ5MjYsImV4cCI6MTY4NTY5NDkyNn0.UYFYfIgFDKMMNpBWopw7MuU6Z3Q6X8TQ4N7qtyrz-DY`
      // }
    });
    sendOrderData() // POST ORDER TO DB, ORDER DOES NOT GO ALL THE WAY UP TO STRIPE BEFORE SUBSEQUENT GET REQ

    const { client_secret: clientSecret } = await response.data;
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: "http://localhost:3000/success" },
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
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        {errorMessage && <div>{errorMessage}</div>}
        {loading && <LoadingOverlay />}
        <br />
        <button
          className="button is-normal is-danger is-fullwidth"
          disabled={loading}
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
}

export default Checkout;
