import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Products.css";
import { Fade } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ProductsError from "./ProductsError";

// Styling originated from:  https://responsive-bulma-cards.netlify.app/ - example #5

import { useCartStore } from "../../store/cartStore";

export default function ProductsDetails() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const product = useLoaderData();
  const cart = useCartStore((state) => state.cart);

  /*   const thisItemInCart = cart.find((f) => f.id === id)?.count || 0; */

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const [cartMessage, setCartMessage] = useState("");
  const [cartMessageStyle, setCartMessageStyle] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState();

  const [thisItemInCart, setThisItemInCart] = useState(
    cart.find((product) => product.id === id)?.count || 0
  );

  const incrementCartItemButtonHandler = () => {
    incrementCartItem(id);
    // setCartMessage(`"${product.title}" was added to cart`);
    setThisItemInCart((prevCount) => prevCount + 1);
    console.log(JSON.stringify(cart));
  };

  const decrementCartItemButtonHandler = () => {
    if (thisItemInCart === 1) {
      handleClickOpen();
    } else {
      decrementCartItem(id);
      setThisItemInCart((prevCount) => prevCount - 1);
      // setCartMessage(`"${product.title}" was removed from cart`);
      console.log(JSON.stringify(cart));
    }
  };

  const removeAllThisItemButtonHandler = () => {
    removeAllThisItem(id);
    setThisItemInCart(0);
    // setCartMessage(`"${product.title}" was removed from cart`);
    handleClose();
    console.log(JSON.stringify(cart));
  };

  /*   const incrementCartItemButtonHandler = () => {
    console.log(JSON.stringify(cart));
    incrementCartItem(product.id);
    setCartMessageStyle("is-size-6");
    setCartMessage(`"${product.title}" was added to cart`);
    setButtonDisabled(false);
  };

  const decrementCartItemButtonHandler = () => {
    console.log(JSON.stringify(cart));
    decrementCartItem(product.id);
    setCartMessageStyle("is-size-6 has-text-danger");
    setCartMessage(`"${product.title}" was removed from cart`);
    if (!thisItemInCart) {
      setButtonDisabled(true);
    }
  };

  const removeAllThisItemButtonHandler = () => {
    removeAllThisItem(product.id);
    setCartMessageStyle("is-size-6 has-text-danger");
    setCartMessage(`"${product.title}" was removed from cart`);
    if (!thisItemInCart) {
      setButtonDisabled(true);
    }
  }; */

  if (!product) {
    return <ProductsError />
  }

  return (
    <div>
      <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a href="/">Home</a>
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
              <div className="card-image p-4">
                <Fade in timeout={500}>
                  <figure className="card-image">
                    <img
                      src={`${baseImgUrl}${product.posterPath}`}
                      alt={`Poster for ${product.title}`}
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
                    <span className="has-text-weight-semibold">
                      &emsp; &emsp; Genres:{" "}
                    </span>
                    {product.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <p>
                    <span className="has-text-weight-semibold">
                      &emsp; &emsp; Runtime:{" "}
                    </span>
                    {product.runtime} minutes
                  </p>
                </div>
                <div className="content p-5 has-background-info-light">
                  <div className="columns">
                    <div className="column">
                      <div className="is-size-5">
                        <span className="has-text-weight-semibold">Price:</span>{" "}
                        <span
                          style={{
                            color:
                              product.price < 10 ? "hsl(348, 100%, 61%)" : "",
                          }}
                        >
                          ${product.price?.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <button
                          className="button is-primary is-small"
                          onClick={() =>
                            incrementCartItemButtonHandler(product.id)
                          }
                        >
                          <FontAwesomeIcon icon={faAdd} />
                        </button>
                        <input
                          className="input is-small has-text-centered"
                          style={{ width: "40px" }}
                          number
                          value={
                            cart.find((product) => product.id === id)?.count ||
                            0
                          }
                          readOnly
                        />
                        <button
                          className="button is-warning is-small"
                          onClick={() =>
                            decrementCartItemButtonHandler(product.id)
                          }
                          disabled={buttonDisabled}
                        >
                          <FontAwesomeIcon icon={faSubtract} />
                        </button>
                        <button
                          className="button is-danger is-small"
                          onClick={() => handleClickOpen(product.id)}
                          disabled={buttonDisabled}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                        <div>
                          <span className={cartMessageStyle}>
                            {cartMessage}
                          </span>
                        </div>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove{" "}
            <span className="has-text-weight-semibold">"{product.title}"</span>{" "}
            from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="button is-small is-primary has-text-weight-semibold"
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="button is-small is-danger is-outlined has-text-weight-semibold"
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
export const productsDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:8080/movies/" + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};