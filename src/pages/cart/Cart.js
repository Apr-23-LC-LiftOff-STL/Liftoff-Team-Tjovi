import { useState, useEffect } from "react";

import { useCartStore } from "../../store/cartStore";

import CartItem from "./CartItem";
import CartSideBar from "./CartSideBar";
import CartIsEmpty from "./CartIsEmpty";
import MovieBar from "../../components/MovieBar/MovieBar.js";
import "./Cart.css";

import axios from "axios";

export default function Cart() {
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
              Shopping Cart
            </a>
          </li>
        </ul>
      </nav>
      <div className="columns">
        <div className="column">
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
              })
            ) : (
              <div>
                <CartIsEmpty />
              </div>
            )}
          </div>
        </div>
        <CartSideBar allItemsSubtotal={allItemsSubtotal?.toFixed(2)} />
      </div>
      <MovieBar />
    </div>
  );
}
