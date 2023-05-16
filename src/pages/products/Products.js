import { Link, useLoaderData, useParams } from "react-router-dom";
import "bulma/css/bulma.css";

export default function Products() {
  const { id } = useParams();
  const products = useLoaderData();
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="card">
      {products.content.map((products) => (
        <Link to={products.id.toString()} key={products.id}>
          <div class="card-content">
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
            
              <p>Genres: {products.genres.map((genre) => genre.name).join(', ')}</p>
              <p>Runtime: {products.runtime} minutes</p>
              <p>Price: ${products.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// data loader

export const productsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch('http://localhost:8080/movies');

  if (!res.ok) {
    throw Error("Could not fetch the list of products");
  }

  return res.json();
};
