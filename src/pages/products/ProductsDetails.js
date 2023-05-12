import { Link, useLoaderData, useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/${id}`, {
          headers: {
            'Authorization': `Basic ${localStorage.getItem('credentials')}`,
          },
        });
        if(response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log("Could not find that product.");
      }
    }

    fetchProduct();
  }, [id]);


  return (
    <div className="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img
                src={product.posterPath}
                alt="movie poster"
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="card-content">
        <p class="title is-4">{product.title}</p>
      
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
