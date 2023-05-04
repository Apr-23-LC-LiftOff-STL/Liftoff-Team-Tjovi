import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Products.css";

export default function ProductsDetails() {
  const { id } = useParams();
  const product = useLoaderData();

  const baseImgUrl = "https://image.tmdb.org/t/p/w400";

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="card is-horizontal shadow-md transform is-duration-300 hover-shadow-xl hover-translate-y">
                <div className="card-image">
                  <figure className="image">
                    <img
                      src={`${baseImgUrl}${product.posterPath}`}
                      alt={`Poster for ${product.title}`}
                    ></img>
                  </figure>
                </div>
                <div className="card-content p-0 is-flex is-flex-direction-column">
                  <div className="content p-5 has-text-weight-normal">
                    <div className="is-size-5">
                      <h3>{product.title}</h3>
                    </div>
                    <p className="is-size-6 has-text-weight-normal is-italic">
                      {product.overview}
                    </p>
                    <p>
                      <span className="has-text-weight-semibold">Genres: </span>
                      {product.genres}
                    </p>
                    <p>
                      <span className="has-text-weight-semibold">
                        Runtime:{" "}
                      </span>
                      {product.runtime} minutes
                    </p>
                  </div>
                  <div className="content p-5 has-background-info-light">
                    <div className="columns">
                      <div className="column">
                        <div className="is-size-5">
                          <span className="has-text-weight-semibold">
                            Price:
                          </span>{" "}
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="is-size-6">
                          <span className="has-text-primary-dark">
                            <br />
                            &#9733;&#9733;&#9733;&#9733;&#9733;
                          </span>{" "}
                          10 Reviews
                        </div>
                      </div>
                      <div className="column">
                        <button className="button is-primary is-normal is-fullwidth has-text-weight-semibold">
                          Add to Cart
                        </button>
                        <br />
                        <NavLink to="/">
                          <button className="button is-normal is-fullwidth">
                            Home
                          </button>
                        </NavLink>
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
