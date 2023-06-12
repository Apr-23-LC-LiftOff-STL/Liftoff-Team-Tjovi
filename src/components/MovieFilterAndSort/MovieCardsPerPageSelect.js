import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';

import { useMovieCountStore } from "../../store/movieCountStore";

const CustomSelect = styled(Select)({
  color: "hsl(0, 0%, 48%)",
  fontSize: '13px',
});

export default function MovieCardsPerPageSelect() {
  const moviesPerPageGlobal = useMovieCountStore((state) => state.moviesPerPageGlobal);
  const setMoviesPerPageGlobal = useMovieCountStore((state) => state.setMoviesPerPageGlobal);

  const defaultMoviesPerPage = 30;

  const handleChange = (event) => {
    setMoviesPerPageGlobal(event.target.value);
  };

  if (moviesPerPageGlobal === null) {
    setMoviesPerPageGlobal(defaultMoviesPerPage);
  }

  return (
    <FormControl sx={{ mt: 0.4, ml: 2.5, minWidth: 60 }} size="small">
      <InputLabel id="demo-select-small-label">View</InputLabel>
      <CustomSelect
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={moviesPerPageGlobal}
        label="Per Page"
        onChange={handleChange}
      >
        <MenuItem style={{fontSize: '13px'}} value={30}>30</MenuItem>
        <MenuItem style={{fontSize: '13px'}} value={60}>60</MenuItem>
        <MenuItem style={{fontSize: '13px'}} value={90}>90</MenuItem>
        <MenuItem style={{fontSize: '13px'}} value={120}>120</MenuItem>
      </CustomSelect>
    </FormControl>
  );
}