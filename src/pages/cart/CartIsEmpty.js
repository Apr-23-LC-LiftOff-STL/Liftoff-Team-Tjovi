import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";


const CartIsEmpty = () => {
  return (
    <div className="mx-6">
    <div className="column is-offset-1 is-vcentered card mb-3 has-background-warning-light">
        <section className="section is-medium">
        <NavLink className="is-center" to="/">
        <div className="is-size-3 has-text-centered pt-2 has-text-danger has-text-weight-semibold">
          Nothing In Cart
        </div>
        <div className="has-text-centered">
            Keep Browsing
        </div>
{/*         <div className="has-text-centered">
        <FontAwesomeIcon icon={faHome} />
        </div> */}
        </NavLink>
      </section>
    </div>
    </div>
  );
};

export default CartIsEmpty;
