import { Fade } from "@mui/material";

const MovieCardsNoneFound = () => {
  return (
    <div>
    <Fade in timeout={2500}>
      <section
        className="section box is-shadowless is-medium my-6 mx-6"
        style={{
          borderStyle: "dashed",
          borderColor: "hsl(0, 0%, 71%)"
        }}
      >
        
          <div className="is-size-5 has-text-centered pt-2 has-text-danger has-text-weight-semibold">
            No Movies Found
          </div>

          <p className="has-text-centered is-italic">Try another search</p>
      </section>
      </Fade>
    </div>
  );
};

export default MovieCardsNoneFound;
