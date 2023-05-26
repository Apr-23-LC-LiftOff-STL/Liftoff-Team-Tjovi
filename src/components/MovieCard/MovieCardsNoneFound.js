import { Fade } from "@mui/material";

const MovieCardsNoneFound = () => {
  return (
    <div>
      <section
        className="section box is-shadowless is-medium my-6 mx-6 has-background-white-ter"
        style={{
          borderStyle: "dashed",
          borderColor: "hsl(348, 100%, 61%)",
          borderWidth: "1px",
        }}
      >
        <Fade in timeout={800}>
          <div className="is-size-4 has-text-centered pt-2 has-text-danger has-text-weight-semibold">
            No Movies Found
          </div>
          </Fade>
          <p className="has-text-centered is-italic">Try another search</p>

      </section>
    </div>
  );
};

export default MovieCardsNoneFound;
