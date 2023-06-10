import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
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
      <div className="field">
        <label className="label">
          Title:
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
      </p>
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
      <div className="title is-4 px-6 pt-3">Edit Product ID # {product.id}</div>
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div
                className="card is-horizontal shadow-xl transform is-duration-100"
                style={{
                  borderStyle: "solid",
                  borderColor: "lightgray",
                  borderWidth: "1px",
                }}
              >
                <div className="card-image p-4">
                  <Fade in timeout={500}>
                    <figure className="image ">
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
                <div className="card-content p-4 is-flex is-flex-direction-column">
                  <div className="content p-4 has-text-weight-normal">
                    {isAdmin && (
                      <form onSubmit={handleFormSubmit}>
                        <label className="label">
                          Title:
                          <input
                            className="input"
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleInputChange}
                            required
                            readOnly
                          />
                        </label>
                        <label className="label">
                          Price:
                          <input
                            className="input"
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                        <label className="label">
                          Overview:
                          <textarea
                            className="textarea"
                            name="overview"
                            value={product.overview}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                        <label className="label">
                          Poster Path:
                          <input
                            className="input"
                            type="text"
                            name="posterPath"
                            value={product.posterPath}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                        <p class="control">
                          <button
                            className="button is-warning"
                            type="submit"
                            value="Update Product"
                          >
                            Update Product
                          </button>
                        </p>
                        <p class="control">
                          <div
                            className="button is-light"
                            onClick={() => navigate("/admin/products")}
                          >
                            Return to Products
                          </div>
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
