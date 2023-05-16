import { useState } from "react";
import { useEffect } from "react";

import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormLabel } from "@mui/material";
import { FormControl } from "@mui/material";

import { useSortStore } from "../../store/sortStore";

const SortOptions = () => {
  const [sort, setSort] = useState(['title', 'ASC']); // consider changing this to RANDOM, by id

  const setSortOptions = useSortStore((state) => state.setSortOptions);

  useEffect(() => {
    // This will be executed whenever the "sort" state changes
    setSortOptions(sort);
  }, [sort, setSortOptions]);

  const handleChange = (e) => {
    const newSort = e.currentTarget.value.split(',');
    setSort(newSort);
  };

  return (
    <div>
      <div>
      <FormControl             name="radioSort">
      <FormLabel id="radio-buttons-sort-options" style={{ color: 'gray', fontSize: '13px' }}></FormLabel>
        <RadioGroup row defaultValue="title,ASC">
          <FormControlLabel
            name="radioSort"
            control={
              <Radio
                id="title-asc"
                onChange={handleChange}
                value="title,ASC"
                size="small"
              />
            }
            label={<span style={{ color: 'gray', fontSize: '12px' }}>A-Z</span>}
          />

          <FormControlLabel
            name="radioSort"
            control={
              <Radio
                id="title-desc"
                onChange={handleChange}
                value="title,DESC"
                size="small"
              />
            }
            label={<span style={{ color: 'gray', fontSize: '12px' }}>Z-A</span>}
          />

          <FormControlLabel
            name="radioSort"
            control={
              <Radio

                id="price-asc"
                onChange={handleChange}
                value="price,ASC"
                size="small"
              />
            }
            label={<span style={{ color: 'gray', fontSize: '12px' }}>$-$$$</span>}
          />

          <FormControlLabel
            name="radioSort"
            control={
              <Radio

                id="price-desc"
                onChange={handleChange}
                value="price,DESC"
                size="small"
              />
            }
            label={<span style={{ color: 'gray', fontSize: '12px' }}>$-$$$</span>}
          />

          <FormControlLabel
            name="radioSort"
            control={
              <Radio
                id="releaseDate-desc"
                onChange={handleChange}
                value="releaseDate,DESC"
                size="small"
              />
            }
            label={<span style={{ color: 'gray', fontSize: '12px' }}>New-Old</span>}
          />

          <FormControlLabel
            name="radioSort"
            control={
              <Radio
                id="releaseDate-asc"
                onChange={handleChange}
                value="releaseDate,ASC"
                size="small"
              />
            }
            label={<span style={{ color: 'gray', fontSize: '12px' }}>Old-New</span>}
          />
        </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default SortOptions;
