import { Link, useLoaderData } from "react-router-dom";
import "bulma/css/bulma.css";

export default function Products() {
  const products = useLoaderData();

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="container">
      {products.content.map((products) => (
        <Link to={products.id.toString()} key={products.id}>
          <div className="card-content">
            <div class="media">
              <div class="media-left">
                <figure>
                  <img src={`${baseImgUrl}${products.posterPath}`} />
                </figure>
              </div>
            </div>
          </div>
          <div class="card-content">
            <p class="title is-4">{products.title}</p>
            <p class="subtitle is-6">({products.releaseDate.slice(0, 4)})</p>
            <p>Genres: {products.genres.map((genre) => genre.name).join(', ')}</p>
            <p>Runtime: {products.runtime} minutes</p>
            <p>Price: ${products.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// data loader
export const productsLoader = async () => {
  const res = await fetch("http://localhost:8080/");

  if (!res.ok) {
    throw Error("Could not fetch the list of products");
  }

  return res.json();
};
