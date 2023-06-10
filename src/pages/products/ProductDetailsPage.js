import { useLoaderData, useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Products.css";
import { Fade } from "@mui/material";

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

// Styling originated from:  https://responsive-bulma-cards.netlify.app/ - example #5

import { useCartStore } from "../../store/cartStore";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function ProductDetailsPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const product = useLoaderData();
  const cart = useCartStore((state) => state.cart);

  const cartUser = useCartStore((state) => state.cartUser);

  /*   useEffect(() => {
    useCartStore.getState().initialize();
  }, [cart]); */

  /*   const thisItemInCart = cart.find((f) => f.id === id)?.count || 0; */

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);
  const changeCartItem = useCartStore((state) => state.changeCartItem);

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const baseImdbUrl = "https://www.imdb.com/title/";

  const [cartMessage, setCartMessage] = useState("");
  const [cartMessageStyle, setCartMessageStyle] = useState("");

  const [thisItemInCart, setThisItemInCart] = useState(
    cart.find((product) => product.id === id)?.count || 0
  );

  const incrementCartItemButtonHandler = () => {
    incrementCartItem(id);
    // setCartMessage(`"${product.title}" was added to cart`);
    setThisItemInCart((prevCount) => prevCount + 1);
  };

  const decrementCartItemButtonHandler = () => {
    if (thisItemInCart === 1) {
      handleClickOpen();
    } else {
      decrementCartItem(id);
      setThisItemInCart((prevCount) => prevCount - 1);
      // setCartMessage(`"${product.title}" was removed from cart`);
    }
  };

  const removeAllThisItemButtonHandler = () => {
    removeAllThisItem(id);
    setThisItemInCart(0);
    // setCartMessage(`"${product.title}" was removed from cart`);
    handleClose();
  };

  /*   const handleCartItemCountChange = (e) => {
    changeCartItem(id, e.target.value);
  } */

  if (!product) {
    return <ProductsError />;
  }

  return (
    <div>
      <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Movie Details
            </a>
          </li>
        </ul>
      </nav>
      <div className="container" style={{ maxWidth: "1080px" }}>
        <div className="columns is-centered mx-2">
          <div className="column">
            <div
              className="card is-horizontal shadow-xl transform is-duration-100"
              style={{ borderStyle: "solid", borderColor: "lightgray" }}
            >
              <div className="card-image mx-4 my-4">
                <Fade in timeout={500}>
                  <figure className="card-image">
                    <img
                      src={`${baseImgUrl}${product.posterPath}`}
                      alt={`Poster for ${product.title}`}
                      style={{ borderStyle: "solid", borderColor: "lightgray" }}
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
                <div className="content has-text-weight-normal">
                  <div>
                    <div
                      className="title is-size-3 is-italic pt-4"
                    >
                      {product.title}
                    </div>
                  </div>
                  <br />
                  <div className="is-size-6 has-text-weight-normal is-italic p-2">
                    <span className="has-text-weight-semibold">Overview: </span>
                    {product.overview}
                  </div>
                  <br />
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
                      IMDB page:{" "}
                    </span>
                    <NavLink to={baseImdbUrl + product.imdbId}>
                      {product.title}
                    </NavLink>
                  </div>
                  <br />
                  <div>
                    <span className="has-text-weight-semibold p-2">Runtime: </span>
                    {product?.runtime} minutes
                  </div>
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
export const productDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:8080/movies/" + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};
