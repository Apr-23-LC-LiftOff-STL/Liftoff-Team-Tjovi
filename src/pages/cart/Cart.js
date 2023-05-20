import { useState, useEffect } from "react";

import { useCartStore } from "../../store/cartStore";

import CartItem from "./CartItem.js";
import CartTotal from "./CartTotal.js";
import MovieBar from "../../components/MovieBar/MovieBar.js";
import "./Cart.css";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {

  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

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

  const emptyCartButtonHandler = () => {
    emptyCart();
  };

  return (
    <div>
      <div>
        {cart.length > 0 ? (
          cart.map((item) => {
            const data = productData[item.id] || {};
            const itemSubtotal = item.count * data.price;
            return (
              <div key={item.id}>
                <CartItem
                  id={item.id}
                  count={item.count}
                  price={data.price}
                  title={data.title}
                  releaseDate={data.releaseDate}
                  posterPath={data.posterPath}
                  subtotal={itemSubtotal.toFixed(2)}
                />
              </div>
            );
          }
          )
        ) : (
          <div>
          <h1 className="is-size-3 has-text-centered pt-6 pb-6 has-text-danger">
            Your Cart is Empty
          </h1>
          </div>
        )}
        {cart.length > 0 && (
          <div>
          <button
            className="button is-danger is-normal is-rounded"
            onClick={emptyCartButtonHandler}
          >
            <FontAwesomeIcon icon={faX} />
            &nbsp; Empty Cart
          </button>
          <CartTotal
        allItemsSubtotal={allItemsSubtotal.toFixed(2)}
      />
      </div>
        )}
      </div>
      <MovieBar />
    </div>
  );
}
