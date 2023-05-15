import { useState } from "react";

import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import { Switch } from "@mui/material";

const SortBar = () => {

  const [sort, setSort] = useState({
    title: '',
    price: '',
    year: ''
});

  const [isChecked, setIsChecked] = useState();

  const handleChangeSortTitle = (e) => {
    if (sort.title != e.currentTarget.id) {
      setSort({
        ...sort,
        title: e.currentTarget.id
      });
    } else {
    setSort({
      ...sort,
      title: ''
    });
  }
    console.log(sort);
  };

  const handleChangeSortPrice = (e) => {
    if (sort.price != e.currentTarget.id) {
      setSort({
        ...sort,
        price: e.currentTarget.id
      });
    } else {
    setSort({
      ...sort,
      price: ''
    });
  }
    console.log(sort);
  };

  const handleChangeSortYear = (e) => {

    if (sort.year != e.currentTarget.id) {
      setSort({
        ...sort,
        year: e.currentTarget.id
      });
    } else {
    setSort({
      ...sort,
      year: ''
    });
  }
    console.log(sort);
  };

  return (
    <div>
      <div>
        <FormControlLabel
          control={
            <Checkbox id="title-asc" onChange={handleChangeSortTitle} value="title-asc" checked={isChecked} />
          }
          label="A-Z"
        />

        <FormControlLabel
          control={
            <Checkbox id="title-desc" onChange={handleChangeSortTitle} value="title-desc" checked={isChecked} />
          }
          label="Z-A"
        />

        <FormControlLabel
          control={
            <Checkbox id="price-asc" onChange={handleChangeSortPrice} value="price-asc" checked={isChecked} />
          }
          label="$-$$$"
        />

        <FormControlLabel
          control={
            <Checkbox id="price-desc" onChange={handleChangeSortPrice} value="price-desc" checked={isChecked} />
          }
          label="$$$-$"
        />

        <FormControlLabel
          control={
            <Checkbox id="year-desc" onChange={handleChangeSortYear} value="year-desc" checked={isChecked} />
          }
          label="New-Old"
        />

        <FormControlLabel
          control={
            <Checkbox id="year-asc" onChange={handleChangeSortYear} value="year-asc" checked={isChecked} />
          }
          label="Old-New"
        />
      </div>
    </div>
  );
};

export default SortBar;