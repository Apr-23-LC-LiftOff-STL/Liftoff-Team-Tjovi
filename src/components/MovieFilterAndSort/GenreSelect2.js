import { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import { useGenreStore } from "../../store/genreStore";

const genreOptions = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Spy',
  'TV Movie',
  'Thriller',
  'War',
  'Western'
];

export default function GenreSelect2() {
  const [genrePicks, setGenrePicks] = useState([]);
  const setSelectedGenres = useGenreStore((state) => state.setSelectedGenres);

  const handleChange = (e) => {
    const selectedOptions = e.target.value;
    setGenrePicks(selectedOptions);
    setSelectedGenres(selectedOptions);
    onFilter(selectedOptions.includes('All Genres') ? '' : selectedOptions);
  };

  const onFilter = (selectedGenres) => {
    // Implement your filter logic here
    console.log("Selected Genres:", selectedGenres);
    // Perform any desired actions based on the selected genres
  };

  return (
    <Box>
      <Typography variant="h6"></Typography>
      <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
        <InputLabel htmlFor="genres-select">Genres</InputLabel>
        <Select
          labelId="genres-select-label"
          id="genres-select"
          multiple
          value={genrePicks}
          onChange={handleChange}
          label="Genres"
        >
          {genreOptions.map((genre) => (
            <MenuItem key={genre} value={genre}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={genrePicks.includes(genre)}
                    onChange={handleChange}
                    value={genre}
                  />
                }
                label={genre}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {genrePicks.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
          Selected Genres: {Array.isArray(genrePicks) ? genrePicks.join(", ") : ''}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
