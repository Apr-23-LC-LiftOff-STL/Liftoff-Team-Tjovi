import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import axios from "axios";

import CheckoutInvItem from "./CheckoutInvItem";

import { useCartStore } from "../../store/cartStore";

export default function CheckoutInv() {
  const cart = useCartStore((state) => state.cart);

  const [productData, setProductData] = useState({});

  const currencySymbol = "$";

  const allItemsSubtotal = cart.reduce((total, item) => {
    const data = productData[item.id] || {};
    const itemSubtotal = item.count * data.price;
    return total + itemSubtotal;
  }, 0);

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

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
          <div
        className="box pl-5 py-3 my-3 has-background-warning-light"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <div className="title is-5 has-text-danger has-text-left has-text-weight-bold">Order Total: &nbsp; {currencySymbol}{allItemsSubtotal.toFixed(2)}</div>
      </div>
      <div
        className="box p-5"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <div>
          <table className="table is-fullwidth">
            <thead className="has-background-primary-light">
              <tr>
                <th className="menu-label has-text-left">Title</th>
                <th className="menu-label has-text-centered">Price</th>
                <th className="menu-label has-text-centered">Count</th>
                <th className="menu-label has-text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const data = productData[item.id] || {};
                const itemSubtotal = item.count * data.price;
                return (
                  <CheckoutInvItem
                    key={item.id}
                    id={item.id}
                    count={item.count}
                    price={data.price}
                    title={data.title}
                    releaseDate={data.releaseDate}
                    posterPath={data.posterPath}
                    subtotal={itemSubtotal.toFixed(2)}
                  />
                );
              })}
              </tbody>
              <tfoot className="has-background-primary-light">
              <tr>
                <th>
                </th>
                <th className="has-text-centered">
                Totals
                </th>
                <th className="has-text-centered">
                {totalProductsInCart}
                </th>
                <th className="has-text-right">
                {currencySymbol}{allItemsSubtotal.toFixed(2)}
                </th>
              </tr>
              </tfoot>
          </table>
        </div>
        <br />
        <div
        className="box mx-3 px-5 py-3 has-background-warning-light"
        style={{
          borderStyle: "solid",
          borderColor: "darkgray",
          borderWidth: "1px",
        }}
      >
        <div className="has-text-centered is-italic is-size-7">On purchase, download codes will be made available on <NavLink to="/account/orders">Order History page.</NavLink></div>
      </div>
      </div>
    </div>
  );
}
