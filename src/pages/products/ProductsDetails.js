import { useLoaderData, useParams } from "react-router-dom";

export default function ProductsDetails() {
  const { id } = useParams();
  const product = useLoaderData();

  return (
    <div className="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img
                src={product.posterPath}
                alt="movie poster"
              ></img>
            </figure>
          </div>
        </div>
      </div>
      <div class="card-content">
        <p class="title is-4">{product.title}</p>
        <p class="subtitle is-6">({product.releaseDate.slice(0, 4)})</p>
        <div class="content">
          <p>Overview: {product.overview}</p>
          <p>Genres: {product.genres}</p>
          <p>Runtime: {product.runtime} minutes</p>
          <p>Price: ${product.price}</p>
        </div>
        <button className="button is-light">Add to Cart</button>
      </div>
    </div>
  );
}

// data loader
export const productsDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch('http://localhost:8080/' + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};
