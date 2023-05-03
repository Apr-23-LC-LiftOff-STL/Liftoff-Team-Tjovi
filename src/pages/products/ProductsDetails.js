import { useLoaderData, useParams } from "react-router-dom";

import "bulma/css/bulma.css";

export default function ProductsDetails() {
  const { id } = useParams();
  const product = useLoaderData();

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div>
      <h1 className="title">Product Details</h1>

      <div className="card">
        <div class="row">
          <div class="column">
            <img
              src={`${baseImgUrl}${product.posterPath}`}
              alt={`Poster for ${product.title}`}
            ></img>
          </div>
          <div class="column">
            <p class="title is-4">{product.title}</p>
            <p class="subtitle is-6">({product.releaseDate.slice(0, 4)})</p>
            <p>Overview: {product.overview}</p>
            <br />
            <p>Genres: {product.genres}</p>
            <p>Runtime: {product.runtime} minutes</p>
            <br />
            <p>Price: ${product.price}</p>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">
              Add to Cart
            </a>
            <a href="/" class="card-footer-item">
              Home
            </a>
          </footer>
        </div>
      </div>
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
