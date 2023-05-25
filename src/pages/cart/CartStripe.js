import "./Cart.css";

import { useCartStore } from "../../store/cartStore";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import LoadingOverlay from "../checkout/LoadingOverlay";

const CartStripe = () => {
  const cart = useCartStore((state) => state.cart);

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
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half mx-4">
          <div className="cartTotal">
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              {errorMessage && <div>{errorMessage}</div>}
              {loading && <LoadingOverlay />}
              <br />
              <button
                className="button is-normal is-danger has-text-weight-semibold is-pulled-right"
                disabled={loading}
              >
                Complete Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStripe;
