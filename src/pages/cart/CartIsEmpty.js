import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { Fade } from "@mui/material";

const CartIsEmpty = () => {
  return (
    <div className="mx-6">
    <div className="column is-offset-1 is-vcentered box is-shadowless mb-3 py-5" style={{borderStyle: 'dashed', borderColor: "hsl(0, 0%, 71%)", borderWidth: "1px"}}>
        <section className="section is-medium">
        <NavLink className="is-center" to="/">
        <Fade in timeout={800}>
        <div className="is-size-4 has-text-centered pt-2 has-text-danger has-text-weight-semibold">
          Nothing In Cart
        </div>
        </Fade>
        <div className="has-text-centered is-italic">
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
