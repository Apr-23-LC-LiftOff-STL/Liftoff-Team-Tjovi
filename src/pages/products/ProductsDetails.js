import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Products.css";

// Styling originated from:  https://responsive-bulma-cards.netlify.app/ - example #5

import { useCartStore } from "../../store/cartStore";

export default function ProductsDetails() {
  const { id } = useParams();
  const product = useLoaderData();

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartTotalItems = useCartStore((state) => state.cartTotalItems);
  const moviesInCart = cart.find((f) => f.id === id)?.count || 0;
  const emptyCart = useCartStore((state) => state.emptyCart);

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const [cartMessage, setCartMessage] = useState("");
  const [cartMessageStyle, setCartMessageStyle] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const addToCartButtonHandler = (e) => {
    cartTotalItems();
    console.log(JSON.stringify(cart));
    addToCart(product.id);
    setCartMessageStyle("is-italic is-size-6 has-text-primary pl-5");
    setCartMessage(`"${product.title}" was added to cart!`);
  };

  const removeFromCartButtonHandler = (e) => {
    cartTotalItems();
    console.log(JSON.stringify(cart));
    removeFromCart(product.id);
    setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    setCartMessage(`"${product.title}" was removed from cart!`);
  };

  const emptyCartButtonHandler = (e) => {
    emptyCart();
    setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    setCartMessage("Cart Emptied");
  };

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div className="card is-horizontal shadow-xl transform is-duration-100">
                <div className="card-image p-4">
                  <figure className="image ">
                    <img
                      src={`${baseImgUrl}${product.posterPath}`}
                      alt={`Poster for ${product.title}`}
                    ></img>
                  </figure>
                </div>
                <div className="card-content p-4 is-flex is-flex-direction-column">
                  <div className="content p-4 has-text-weight-normal">
                    <div className="is-size-5">
                      <h3>{product.title}</h3>
                    </div>
                    <p className="is-size-6 has-text-weight-normal is-italic">
                      {product.overview}
                    </p>
                    <p>
                      <span className="has-text-weight-semibold">
                        &emsp; &emsp; Genres:{" "}
                      </span>
                      {product.genres}
                    </p>
                    <p>
                      <span className="has-text-weight-semibold">
                        &emsp; &emsp; Runtime:{" "}
                      </span>
                      {product.runtime} minutes
                    </p>
                  </div>
                  <div className="content p-5 has-background-info-light">
                    <div className="columns">
                      <div className="column">
                        <div className="is-size-4">
                          <span className="has-text-weight-semibold">
                            Price:
                          </span>{" "}
                          <span>${product.price.toFixed(2)}</span>
                          <span className={cartMessageStyle}>
                            {cartMessage}
                          </span>
                        </div>

                        <div>
                          <button
                            className="button is-normal is-primary is-rounded has-text-weight-semibold"
                            onClick={addToCartButtonHandler}
                          >
                            Add to Cart
                          </button>
                          <button
                            className="button is-normal is-warning is-rounded"
                            onClick={removeFromCartButtonHandler}
                          >
                            Remove From Cart
                          </button>
                          <button
                            className="button is-danger is-normal is-rounded"
                            onClick={emptyCartButtonHandler}
                            disabled={buttonDisabled}
                          >
                            Empty Cart
                          </button>
                          <NavLink to="/">
                            <button className="button is-normal is-link is-rounded">
                              Home
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <p className="is-size-7"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// data loader
export const productsDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:8080/" + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};
