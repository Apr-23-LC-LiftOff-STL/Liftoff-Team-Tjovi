import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Products.css";
import { Fade } from "@mui/material";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faSubtract,
  faX,
  faHome,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ProductsError from "./ProductsError";

import { useCartStore } from "../../store/cartStore";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function ProductDetailsDialog({ id, handleCloseDialog }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  //const { id } = useParams();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cart = useCartStore((state) => state.cart);
  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const [cartMessage, setCartMessage] = useState("");
  const [cartMessageStyle, setCartMessageStyle] = useState("");

  const [thisItemInCart, setThisItemInCart] = useState(
    cart.find((product) => product.id === id)?.count || 0
  );

  const incrementCartItemButtonHandler = () => {
    incrementCartItem(id);
    setThisItemInCart((prevCount) => prevCount + 1);
  };

  const decrementCartItemButtonHandler = () => {
    if (thisItemInCart === 1) {
      handleClickOpen();
    } else {
      decrementCartItem(id);
      setThisItemInCart((prevCount) => prevCount - 1);
    }
  };

  const removeAllThisItemButtonHandler = () => {
    removeAllThisItem(id);
    setThisItemInCart(0);
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  /*   const handleCartItemCountChange = (e) => {
    changeCartItem(id, e.target.value);
  } */

  console.log(id);

  if (!product) {
    return <ProductsError />;
  }

  return (
    <div>
      {/*       <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a onClick={() => navigate(-1)}>Home</a>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Movie Details
            </a>
          </li>
        </ul>
      </nav> */}
      <div className="container">
        <div
          className="mb-3 p-2"
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-between",
          }}
        >
          <div className="has-text-left px-4" style={{ flex: "0 0 auto" }}>
            <div className="title">Movie Details</div>
          </div>
          <div className="has-text-left px-4" style={{ marginLeft: "auto" }}>
            <div
              className="button is-light"
              onClick={handleCloseDialog}
              style={{ flex: "0 0 auto" }}
            >
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column">
            <div
              className="card is-horizontal shadow-xl transform is-duration-100"
              style={{ borderStyle: "solid", borderColor: "lightgray" }}
              onClick={handleClickOpen}
            >
              <div className="card-image mx-4 my-4">
                <Fade in timeout={500}>
                  <figure className="card-image">
                    <img
                      src={`${baseImgUrl}${product.posterPath}`}
                      alt={`Poster for ${product.title}`}
                      style={{ borderStyle: "solid", borderColor: "lightgray" }}
                    ></img>
                  </figure>
                </Fade>
              </div>
              <div className="card-content p-4 is-flex is-flex-direction-column">
                <div className="content p-4 has-text-weight-normal">
                  <div className="is-size-5 is-italic">
                    <h3>{product.title}</h3>
                  </div>
                  <p className="is-size-6 has-text-weight-normal is-italic">
                    {product.overview}
                  </p>
                  <p>
                    <span className="has-text-weight-semibold">Genres: </span>
                    {product?.genres
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((genre) => genre.name)
                      .join(", ")}
                  </p>
                  <p>
                    <span className="has-text-weight-semibold">Runtime: </span>
                    {product?.runtime} minutes
                  </p>
                </div>
                <div
                  className="content p-5 mb-2 mr-2 box is-shadowless has-background-light"
                  style={{ borderStyle: "solid", borderColor: "lightgray" }}
                >
                  <div className="columns pl-3">
                    <div className="column is-4">
                      {/*                       <div className="select" onChange={handleCartItemCountChange}>
                        <select>
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                        </select>
                      </div> */}
                      <div className="is-size-5 has-text-weight-semibold">
                        In Cart &nbsp;
                        <input
                          className="input has-text-centered"
                          style={{ width: "50px" }}
                          number
                          value={
                            cart.find((product) => product.id === id)?.count ||
                            0
                          }
                          readOnly
                        />{" "}
                      </div>
                      <br />
                      <div className="is-size-5">
                        <span className="has-text-weight-semibold">Price:</span>{" "}
                        <span
                          style={{
                            color:
                              product.price < 10 ? "hsl(348, 100%, 61%)" : "",
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="column">
                        <button
                          className="button is-primary is-small"
                          style={{ minWidth: "165px" }}
                          onClick={() =>
                            incrementCartItemButtonHandler(product.id)
                          }
                        >
                          <FontAwesomeIcon icon={faAdd} />
                          &nbsp; Add to Cart
                        </button>
                        <br></br>
                        <br></br>
                        <button
                          className="button is-warning is-small"
                          style={{ minWidth: "165px" }}
                          onClick={() =>
                            decrementCartItemButtonHandler(product.id)
                          }
                          disabled={!thisItemInCart}
                        >
                          <FontAwesomeIcon icon={faSubtract} />
                          &nbsp; Remove from Cart
                        </button>
                        <br></br>
                        <br></br>
                        <button
                          className="button is-danger is-small"
                          style={{ minWidth: "165px" }}
                          onClick={() => handleClickOpen(product.id)}
                          disabled={!thisItemInCart}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          &nbsp; Remove All From Cart
                        </button>
                        <div>
                          <span className={cartMessageStyle}>
                            {cartMessage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove{" "}
            <span className="has-text-weight-semibold">"{product.title}"</span>{" "}
            from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="button is-warning" onClick={handleClose} autoFocus>
            Cancel
          </button>
          <button
            className="button is-danger is-outlined m-2"
            onClick={removeAllThisItemButtonHandler}
          >
            Remove Item
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// data loader
export const productDetailsLoader = async ({ id }) => {
  const res = await fetch("http://localhost:8080/movies/" + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};

