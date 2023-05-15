import { useState } from "react";

import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormLabel, FormGroup } from "@mui/material";

const SortBar = () => {
  const [sortTitle, setSortTitle] = useState();
  const [sortYear, setSortYear] = useState();
  const [sortPrice, setSortPrice] = useState();

  const handleChangeSortTitle = (e) => {
    setSortTitle(e.target.value);
    console.log(sortTitle);
  };

  const handleChangeSortPrice = (e) => {
    setSortPrice(e.target.value);
    console.log(sortPrice);
  };

  const handleChangeSortYear = (e) => {
    setSortYear(e.target.value);
    console.log(sortYear);
  };

  return (
    <div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeSortTitle}
              value="title-asc"
              defaultChecked
            />
          }
          label="A-Z"
        />

        <FormControlLabel
          control={
            <Checkbox onChange={handleChangeSortTitle} value="title-desc" />
          }
          label="Z-A"
        />

        <FormControlLabel className="is-primary"
          control={
            <Checkbox onChange={handleChangeSortPrice} value="price-asc" />
          }
          label="$-$$$"
        />

        <FormControlLabel
          control={
            <Checkbox onChange={handleChangeSortPrice} value="price-desc" />
          }
          label="$$$-$"
        />

        <FormControlLabel
          control={
            <Checkbox onChange={handleChangeSortYear} value="year-asc" />
          }
          label="New-Old"
        />

        <FormControlLabel
          control={
            <Checkbox onChange={handleChangeSortYear} value="year-desc" />
          }
          label="Old-New"
        />
      </div>
    </div>
  );
};

export default SortBar;
