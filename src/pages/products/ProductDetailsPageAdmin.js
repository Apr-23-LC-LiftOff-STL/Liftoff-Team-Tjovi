import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Products.css";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const authorities = decodedToken.authorities;
      setIsAdmin(authorities.includes("ROLE_ADMIN"));
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        navigate("/login");
      }
    };

    fetchProduct();
  }, [id, navigate, isAdmin]);

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8080/admin/update",
        product,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setProduct(response.data);
        alert("Product updated successfully");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // render form for admin users
  const renderAdminForm = () => (
    <form onSubmit={handleFormSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Overview:
        <input
          type="text"
          name="overview"
          value={product.overview}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Poster Path:
        <input
          type="text"
          name="posterPath"
          value={product.posterPath}
          onChange={handleInputChange}
          required
        />
      </label>
      <input type="submit" value="Update Product" />
    </form>
  );

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div className="card is-horizontal shadow-xl transform is-duration-100">
                <div className="card-image p-4">
                  <Fade in timeout={500}>
                    <figure className="image ">
                      <img
                        src={`${baseImgUrl}${product.posterPath}`}
                        alt={`Poster for ${product.title}`}
                      ></img>
                    </figure>
                  </Fade>
                </div>
                <div className="card-content p-4 is-flex is-flex-direction-column">
                  <div className="content p-4 has-text-weight-normal">
                    {isAdmin ? (
                      <form onSubmit={handleFormSubmit}>
                        <label>
                          Title:
                          <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleInputChange}
                            required
                            readOnly
                          />
                        </label>
                        <label>
                          Price:
                          <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                        <label>
                          Overview:
                          <textarea
                            name="overview"
                            value={product.overview}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                        <label>
                          Poster Path:
                          <input
                            type="text"
                            name="posterPath"
                            value={product.posterPath}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                        <input type="submit" value="Update Product" />
                      </form>
                    ) : (
                      <div>
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
                          <p>
                            {product.genres
                              ? product.genres
                                  .map((genre) => genre.name)
                                  .join(", ")
                              : "Loading genres..."}
                          </p>
                        </p>
                        <p>
                          <span className="has-text-weight-semibold">
                            &emsp; &emsp; Runtime:{" "}
                          </span>
                          {product.runtime} minutes
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="content p-5 has-background-info-light">
                    <div className="columns">
                      <div className="column">
                        <div className="is-size-4">
                          <span className="has-text-weight-semibold">
                            Price:
                          </span>{" "}
                          <span
                            style={{
                              color:
                                product.price < 10 ? "hsl(348, 100%, 61%)" : "",
                            }}
                          >
                            ${product.price && product.price}
                          </span>
                        </div>
                        <div>
                          <div></div>
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
export const productDetailsLoaderAdmin = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:8080/movies/" + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};
