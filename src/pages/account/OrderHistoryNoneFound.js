import { NavLink } from "react-router-dom";
import { Fade } from "@mui/material";


const OrderHistoryNoneFound = () => {
  return (
    <div>
    <Fade in timeout={500}>
      <section
        className="section box is-shadowless is-medium my-6 mx-6"
        style={{
          borderStyle: "dashed",
          borderColor: "hsl(0, 0%, 71%)"
        }}
      >
        
          <div className="is-size-5 has-text-centered pt-2 has-text-danger has-text-weight-semibold">
            No past orders exist on this account.
            </div>
            <div className="has-text-centered is-italic">
          <NavLink to="/">Keep Browsing</NavLink>
          </div>
      </section>
      </Fade>
    </div>
  );
};

export default OrderHistoryNoneFound;
