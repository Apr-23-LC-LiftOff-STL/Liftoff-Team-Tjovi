import { useLoaderData } from "react-router-dom";
import CartItem from "./CartItem.js";
import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import CartTotal from "./CartTotal.js";
import "./Cart.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

  const [subTotalAll, setSubTotalAll] = useState();

  const [productData, setProductData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const cartProduct of cart) {
        try {
          const response = await axios.get(`http://localhost:8080/${cartProduct.id}`);
          const { title, releaseDate, posterPath, price } = response.data;
          data[cartProduct.id] = { title, releaseDate, posterPath, price };
        } catch (error) {
          console.log(`Error fetching data for product with ID ${cartProduct.id}:`, error);
        }
      }
      setProductData(data);
    };

    fetchData();
  }, [cart]);

  const emptyCartButtonHandler = () => {
    emptyCart();
  };

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((cartProduct) => {
          const data = productData[cartProduct.id] || {};
          return (
            <div key={cartProduct.id}>
              <CartItem
                id={cartProduct.id}
                count={cartProduct.count}
                title={data.title}
                releaseDate={data.releaseDate}
                posterPath={data.posterPath}
                price={data.price}
              />
            </div>
          );
        })
      ) : (
        <h1 className="is-size-3 has-text-centered">Your Cart is Empty</h1>
      )}
      {cart.length > 0 && (
        <button
          className="button is-danger is-normal is-rounded"
          onClick={emptyCartButtonHandler}
        >
          <FontAwesomeIcon icon={faX} />
          &nbsp; Empty Cart
        </button>
      )}
      {cart.length > 0 && (
      <CartTotal />
      )}
    </div>
  );
}
