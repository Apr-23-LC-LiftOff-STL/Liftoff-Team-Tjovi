import { useParams, useNavigate, NavLink } from "react-router-dom";
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
  const [openRemove, setOpenRemove] = useState(false);
  const [product, setProduct] = useState(null);
  //const { id } = useParams();
  const navigate = useNavigate();

  const handleClickOpenRemove = (event) => {
    //setOpenRemove(true);
  };

  const handleCloseRemove = (event) => {
    setOpenRemove(false);
  };

  const cart = useCartStore((state) => state.cart);
  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const baseImdbUrl = "https://www.imdb.com/title/";

  const [thisItemInCart, setThisItemInCart] = useState(
    cart.find((product) => product.id === id)?.count || 0
  );

  const incrementCartItemButtonHandler = (event) => {
    incrementCartItem(id);
    setThisItemInCart((prevCount) => prevCount + 1);
  };

  const decrementCartItemButtonHandler = (event) => {
    if (thisItemInCart === 1) {
      removeAllThisItem(id);
      setThisItemInCart(0);
      //handleClickOpenRemove();
    } else {
      decrementCartItem(id);
      setThisItemInCart((prevCount) => prevCount - 1);
    }
  };

  const removeAllThisItemButtonHandler = (event) => {
    removeAllThisItem(id);
    setThisItemInCart(0);
    handleCloseRemove();
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
          <div className="columns is-centered">
            <div className="column">
              <div
                className="card is-horizontal shadow-xl transform is-duration-100"
                style={{ borderStyle: "solid", borderColor: "lightgray"}}
              >
                <div className="card-image mx-4 my-4">
                  <Fade in timeout={500}>
                    <figure className="card-image">
                      <img
                        src={`${baseImgUrl}${product.posterPath}`}
                        alt={`Poster for ${product.title}`}
                        style={{
                          borderStyle: "solid",
                          borderColor: "lightgray",
                        }}
                      ></img>
                      {product.tagline && (
                        <div
                          className="subtitle is-size-6 is-italic has-text-centered card is-shadowless has-background-info-light my-1 p-3"
                          style={{
                            borderStyle: "solid",
                            borderColor: "lightgray",
                          }}
                        >
                          "{product.tagline}"
                        </div>
                      )}
                    </figure>
                  </Fade>
                </div>
                <div className="card-content p-4 is-flex is-flex-direction-column">
                  <div className="content p-4 has-text-weight-normal">
                    <div className="">
                      <div
                        className="button is-pulled-right is-light"
                        onClick={handleCloseDialog}
                        style={{
                          borderStyle: "solid",
                          borderColor: "lightgray",
                        }}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </div>
                      <div>
                        <div className="title is-3 is-italic pb-2">
                          {product.title}
                        </div>
                      </div>
                    </div>
                    <div className="is-size-6 has-text-weight-normal ml-2 mr-6 my-4">
                      <span className="has-text-weight-semibold">
                        Overview:{" "}
                      </span>
                      <span className="is-italic">{product.overview}</span>
                    </div>
                    {/*                     <p>
                      <span className="has-text-weight-semibold">Genres: </span>
                      {product?.genres
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((genre) => genre.name)
                        .join(", ")}
                    </p> */}
                    <div>
                      <span className="has-text-weight-semibold p-2">
                        Runtime:{" "}
                      </span>
                      {product?.runtime} minutes
                    </div>
                    <div>
                      <span className="has-text-weight-semibold p-2">
                        Popularity Rating:
                      </span>
                      {product.vote_average}
                    </div>
                    <div>
                      <span className="has-text-weight-semibold p-2">
                        More info at
                      </span>
                      <NavLink to={baseImdbUrl + product.imdbId}>IMDB</NavLink>
                    </div>
                    <hr />
                    <div className="pl-2">
                      <span className="is-size-5 has-text-weight-semibold">
                        Movie
                        <span className="is-size-5 has-text-primary has-text-weight-bold">
                          DL
                        </span>{" "}
                        price:
                      </span>{" "}
                      <span
                        className="is-size-5 card mx-3 p-2"
                        style={{
                          borderStyle: "solid",
                          borderColor: "hsl(171, 100%, 41%)",
                          borderWidth: "1px",
                          color:
                            product.price < 10 ? "hsl(348, 100%, 61%)" : "",
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div
                    className="content mb-2 mr-2 box is-shadowless has-background-light"
                    style={{ borderStyle: "solid", borderColor: "lightgray" }}
                  >
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
                    <div className="has-text-weight-semibold pb-4">
                      {" "}
                      <input
                        className="input has-text-centered"
                        style={{ width: "50px" }}
                        number
                        value={
                          cart.find((product) => product.id === id)?.count || 0
                        }
                        readOnly
                      />{" "}
                      <span className="menu-label has-text-weight-bold">
                        IN CART
                      </span>
                    </div>
                    <div className="">
                      <button
                        className="button is-primary is-small"
                        style={{ width: "165px" }}
                        onClick={incrementCartItemButtonHandler}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                        &nbsp; Add to Cart
                      </button>
                      <br></br>
                      <br></br>
                      <button
                        className="button is-warning is-small"
                        style={{ width: "165px" }}
                        onClick={decrementCartItemButtonHandler}
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
                        onClick={removeAllThisItemButtonHandler}
                        disabled={!thisItemInCart}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        &nbsp; Remove All From Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*       <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
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
          <button
            className="button is-warning"
            onClick={handleCloseRemove}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="button is-danger is-outlined m-2"
            onClick={removeAllThisItemButtonHandler}
          >
            Remove Item
          </button>
        </DialogActions>
      </Dialog> */}
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
