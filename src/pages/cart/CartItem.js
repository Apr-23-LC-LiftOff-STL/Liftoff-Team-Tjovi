import "./Cart.css";
import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { Fade } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import logo125 from "../../components/Logo_MovieDL_20230426_125x22.png";

const CartItem = ({
  title,
  posterPath,
  id,
  count,
  price,
  releaseDate,
  subtotal,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cart = useCartStore((state) => state.cart);
  const cartUser = useCartStore((state) => state.cartUser);

/*   useEffect(() => {
    useCartStore.getState().initialize();
    console.log(cartUser);
  }, [cart]); */

  const baseProductUrl = "/products/";
  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);
  //const changeItemCount = useCartStore((state) => state.changeItemCount);

  const incrementCartItemButtonHandler = () => {
    incrementCartItem(id);
  };

  const decrementCartItemButtonHandler = () => {
    if (count === 1) {
      handleClickOpen();
    } else {
      decrementCartItem(id);
    }
  };

  const removeAllThisItemButtonHandler = () => {
    handleClickOpen();
    removeAllThisItem(id);
  };

  return (
    <div className="mx-4" style={{maxWidth: '1400px'}}>
      <Fade in timeout={500}>
        <div className="column is-offset-2 is-vcentered card mb-3" style={{borderStyle: 'solid', borderColor: 'lightgray', borderWidth: '1px'}}>
          <div className="columns is-centered is-vcentered is-narrow">
            <div className="column is-narrow">
              <figure className="cart-item-img">
                <a href={`${baseProductUrl}${id}`}>
                  <img
                    src={`${baseImgUrl}${posterPath}`}
                    alt={`Poster for ${title}`}
                  ></img>
                </a>
              </figure>
            </div>
            <div className="column">
              <div>
                <span className="is-size-5 has-text-weight-semibold is-italic">
                  {title}
                </span>
                <div className="is-size-6">({releaseDate?.slice(0, 4)})</div>
              </div>
              {/*               <div>
                Movie ID: {id} Count: {count}
              </div> */}
            </div>
            <div className="column is-1 pr-6">
              <button
                className="button is-primary is-small"
                style={{ minWidth: "36px", maxWidth: "36px" }}
                onClick={incrementCartItemButtonHandler}
              >
                <FontAwesomeIcon icon={faAdd} />
              </button>
              <input
                className="input is-small has-text-centered"
                style={{ minWidth: "36px", maxWidth: "36px" }}
                number
                value={count}
                readOnly
              />
              <button
                className="button is-warning is-small"
                style={{ minWidth: "36px", maxWidth: "36px" }}
                onClick={decrementCartItemButtonHandler}
              >
                <FontAwesomeIcon icon={faSubtract} />
              </button>
              <button
                className="button is-danger is-small"
                style={{ minWidth: "36px", maxWidth: "36px" }}
                onClick={handleClickOpen}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <div className="column is-narrow">
            <table className="table mr-5">
              <tr>
                <th className="menu-label has-text-centered">
                  Price
                </th>
                <th className="menu-label has-text-centered">
                  Subtotal
                </th>
              </tr>
              <tr>
                <td
                  className="has-text-centered"
                  style={{
                    color: price < 10 ? "hsl(348, 100%, 61%)" : "",
                  }}
                >
                  ${price?.toFixed(2)}
                </td>
                <td className="has-text-centered has-text-weight-semibold">
                  ${subtotal}
                </td>
              </tr>
            </table>
            </div>
          </div>
        </div>
      </Fade>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"><img src={logo125} width="112" height="28" /></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Remove{" "}
              <span className="has-text-weight-semibold">"{title}"</span> from
              your cart?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="button is-small is-warning has-text-weight-semibold"
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
    </div>
  );
};

export default CartItem;
