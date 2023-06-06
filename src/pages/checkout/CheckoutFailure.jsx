import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import axios from "axios";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function CheckoutSuccess() {
  const cartUser = useCartStore((state) => state.cartUser);
  const cart = useCartStore((state) => state.cart);

  let date = new Date();

  // MW - how to get total, cart etc if emptyCart() triggers on component mount after post req?
  // POSSIBLE SOLUTION:  consider POST then GET from DB order table.  Likely!

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
              Checkout Failed
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
              boxShadow: "0 8px 16px 4px hsl(348, 100%, 61%)",
            }}
          >
            <div className="title is-3 mt-5 has-text-weight-semibold has-text-danger">
              Checkout Failed!
            <span className="is-pulled-right"><img src={logo125}></img></span></div>
            <div>{cartUser ? cartUser : "GUEST"}</div>
            <div>Please return to Shopping Cart and attempt your purchase again.</div>
            <div>{date.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
