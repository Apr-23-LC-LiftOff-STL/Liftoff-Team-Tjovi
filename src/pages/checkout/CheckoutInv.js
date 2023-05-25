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
        className="box is-shadowless pl-5 py-3 mb-1 has-background-warning-light"
        style={{
          borderStyle: "solid",
          borderColor: "lightgray",
          borderWidth: "1px",
        }}
      >
        <div className="title is-5 has-text-danger has-text-left has-text-weight-bold">Order Total: &nbsp; {currencySymbol}{allItemsSubtotal?.toFixed(2)}</div>
      </div>
        <div className="box is-shadowless px-5 py-5 pt-4 mt-4"
                style={{
          borderStyle: "solid",
          borderColor: "lightgray",
          borderWidth: "1px",
        }}>
          <table className="table is-fullwidth">
            <thead className="has-background-white-ter">
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
              <tfoot className="has-background-white-ter">
              <tr className="has-background-white">
                <th>
                </th>
                <th className="has-text-right">
                Subtotal
                </th>
                <th className="has-text-centered">
                </th>
                <th className="has-text-right">
                {currencySymbol}{allItemsSubtotal?.toFixed(2)}
                </th>
              </tr>
              <tr className="has-background-white">
                <th>
                </th>
                <th className="has-text-right">
                Sales Tax
                </th>
                <th className="has-text-centered">
                </th>
                <th className="has-text-right">
                {currencySymbol}0.00
                </th>
              </tr>
              <tr>
                <th>
                </th>
                <th className="has-text-right">
                Total
                </th>
                <th className="has-text-centered">
                </th>
                <th className="has-text-right">
                {currencySymbol}{allItemsSubtotal?.toFixed(2)}
                </th>
              </tr>
              </tfoot>
          </table>
      </div>
      <div
        className="box is-shadowless has-background-warning-light px-4 py-3 mt-5 mx-4"
      >
        <div className="has-text-centered is-italic is-size-7">On purchase, movie download codes will be made available on <NavLink to="/account/orders">Order History page.</NavLink></div>
      </div>
    </div>
  );
}
