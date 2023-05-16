import Select from "react-select"; // npm install react-select
import makeAnimated from 'react-select/animated';
import { useGenreStore } from "../../store/genreStore";
import { useState } from "react";

// Getting started with React Select
// https://blog.logrocket.com/getting-started-react-select/

const GenreSelect = () => {

  const setSelectedGenres = useGenreStore((state) => state.setSelectedGenres);

  const styles = {
    control: (base) => ({
      ...base,
      minHeight: 32,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    }),
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: 'hsl(0, 0%, 71%)',
          font: 'smaller'
      }
  }
  };

  const handleChange = (selectedGenres) => {
    const genreValues = selectedGenres ? selectedGenres.map((option) => option.value) : [];
    //let arrGenres = selectedGenres.map(genre => genre.value);
    setSelectedGenres(genreValues); // logic may need to change for this
    console.log(`Genre(s) selected:`, genreValues);
  };
  
  const genres = [
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animation", label: "Animation" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "History", label: "History" },
    { value: "Horror", label: "Horror" },
    { value: "Music", label: "Music" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Science Fiction", label: "Sci-Fi" },
    { value: "Spy", label: "Spy" },
    { value: "TV Movie", label: "TV Movie"},
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western"}
  ];

  //const [selectedGenres, setSelectedGenres] = useState("");

/*   const handleChange = (selectedGenres) => {
    console.log(selectedGenres);
    setSelectedOptions(selectedGenres.value);
  }; */

  const animatedComponents = makeAnimated();

  return (
    <div className="columns">
    <div className="column">
    <div className="genre-select-main">
      <Select styles={styles}
      name="genre-select"
      placeholder="Filter by Genre"
        components={animatedComponents}
        isMulti
        onChange={handleChange}
        options={genres}
      />
    </div>
    </div>
    </div>
  );
};

export default GenreSelect;
