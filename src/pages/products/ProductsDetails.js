import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import "./Products.css";

// https://responsive-bulma-cards.netlify.app/ - example #5

export default function ProductsDetails() {
  const { id } = useParams();
  const product = useLoaderData();

  const baseImgUrl = "https://image.tmdb.org/t/p/w400";

  const [addToCart, setAddToCart] = useState("");
  const [addToCartButtonStyle, setAddToCartButtonStyle] = useState("is-primary");
  const addToCartButtonHandler = (e) => {
    setAddToCart(`"${product.title}" was added to cart!`);
    setAddToCartButtonStyle("is-success");
  };

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div className="card is-horizontal shadow-xl transform is-duration-100">
                <div className="card-image p-4">
                  <figure className="image">
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
                      <span className="has-text-weight-semibold">&emsp; &emsp; Genres: </span>
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
                          ${product.price.toFixed(2)}
                          <span className="is-italic is-size-6 has-text-danger pl-5">{addToCart}</span>
                        </div>
                        <div>
                        
                        <br />
                        <button className="button is-medium is-primary is-fullwidth has-text-weight-semibold" onClick={addToCartButtonHandler}>
                          Add to Cart
                        </button>
                        <br />
                        <NavLink to="/">
                          <button className="button is-normal is-link is-fullwidth">
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
