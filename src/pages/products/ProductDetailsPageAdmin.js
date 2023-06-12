import { useLoaderData, useParams, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import posterNA from "./posterNA.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const [isAdmin, setIsAdmin] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

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
          setProductNotFound(false);
        } else {
          setProductNotFound(true);
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

  /*   const confirmAlert = (id) => {
    if (window.confirm("Delete product ID # " + id + " ?")) {
      handleDelete(id);
    } else {
    }
  }; */

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/admin/deleteMovie/" + id);
      alert("ID # " + id + " deleted from database");
      navigate(-1);
    } catch (error) {
      console.log("Error deleting movie: ", error);
    }
  };

  const location = useLocation();
  const currentProductId = parseInt(id, 10);
  const prevProductId = currentProductId - 1;
  const nextProductId = currentProductId + 1;

  // render form for admin users
  const renderAdminForm = () => (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <label className="label">
          title
          <div className="control">
            <input
              className="input"
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              required
            />
          </div>
        </label>
      </div>
      <p>
        <label className="label">
          price
          <div className="control">
            <input
              className="input"
              name="price"
              type="number"
              min="0"
              step=".01"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </label>
      </p>
      <label className="label">
        overview
        <div className="control">
          <input
            className="input"
            type="text"
            name="overview"
            value={product.overview}
            onChange={handleInputChange}
            required
          />
        </div>
      </label>
      <label className="label">
        posterPath
        <div className="control">
          <input
            className="input"
            type="text"
            name="posterPath"
            value={product.posterPath}
            onChange={handleInputChange}
            required
          />
        </div>
      </label>
      <input
        className="button is-warning"
        type="submit"
        value="Update Product"
      />
    </form>
  );

  return (
    <div>
      <div className="is-size-6 ml-6 mt-2 mb-2">
        PRODUCT ID # <span className="has-text-weight-semibold">{id}</span>
      </div>
      <div className="field is-grouped ml-6">
        <p className="control">
          <div
            className="button is-small is-info"
            onClick={() => navigate("/admin/products")}
          >
            Back to Products
          </div>
        </p>
        <p className="control">
          <a
            className="button is-small is-info is-light is-outlined"
            onClick={() => navigate(`../products/${prevProductId}`)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; ID # {prevProductId}
          </a>
        </p>
        <p className="control">
          <a
            className="button is-small is-info is-light is-outlined"
            onClick={() => navigate(`../products/${nextProductId}`)}
          >
            ID# {nextProductId}&nbsp; <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </p>
      </div>
      {!productNotFound ? (
        <div className="columns is-centered mb-6 px-6">
          <div className="column">
            <div
              className="card is-horizontal shadow-xl transform is-duration-100"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              {product.posterPath ? (
                <div className="card-image p-4" style={{ maxWidth: "500px" }}>
                  <Fade in timeout={500}>
                    <figure className="image">
                      <img
                        src={`${baseImgUrl}${product.posterPath}`}
                        alt={`Poster for ${product.title}`}
                        style={{
                          borderStyle: "solid",
                          borderColor: "lightgray",
                          borderWidth: "1px",
                        }}
                      ></img>
                    </figure>
                  </Fade>
                </div>
              ) : (
                <img
                  className="movie-bar-img"
                  src={posterNA}
                  alt={`no poster image available for ${product.title}`}
                />
              )}
              <div className="card-content p-4 is-flex is-flex-direction-column">
                <div className="content p-4 has-text-weight-normal">
                  {isAdmin && renderAdminForm()}
                  <hr></hr>
                  <p className="control">
                    <button
                      className="button is-small is-danger"
                      onClick={() => handleDelete(product.id)}
                      value="Update Product"
                    >
                      Delete Product
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Fade in timeout={500}>
          <div className="pl-6">
            <h2 className="has-text-danger">Product Not Found</h2>
            <p>Product ID # {id} was not found.</p>
            <div className="section is-medium"></div>
          </div>
        </Fade>
      )}
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
