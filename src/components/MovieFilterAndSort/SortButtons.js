import { useState } from "react";
import { useEffect } from "react";

import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormLabel } from "@mui/material";
import { FormControl } from "@mui/material";

import { useSortStore } from "../../store/sortStore";

const SortOptions = () => {
  const [sort, setSort] = useState(["title", "ASC"]); // consider changing this to RANDOM, by id

  const setSortOptions = useSortStore((state) => state.setSortOptions);

  useEffect(() => {
    setSortOptions(sort);
  }, [sort, setSortOptions]);

  const handleChange = (e) => {
    const newSort = e.currentTarget.value.split(",");
    setSort(newSort);
  };

  return (
    <div className="pl-5" style={{ marginBottom: "-10px"}}>
    <div>
        <FormControl name="radioSort">
        <FormLabel id="radio-buttons-sort-options" style={{ color: "hsl(0, 0%, 48%)", fontSize: "12px" }}>
        </FormLabel>
        <RadioGroup sx={{ flexDirection: "column" }} defaultValue="title,ASC">

              <FormControlLabel
                name="radioSort"
                control={
                  <Radio
                    disableRipple
                    id="title-asc"
                    onChange={handleChange}
                    value="title,ASC"
                    size="small"
                    sx={{ marginLeft: '-4px', marginRight: '-4px' }}
                  />
                }
                label={
                  <span style={{ color: "hsl(0, 0%, 48%)", fontSize: "12px" }}>A-Z</span>
                }
              />

              <FormControlLabel
                name="radioSort"
                control={
                  <Radio
                    disableRipple
                    id="title-desc"
                    onChange={handleChange}
                    value="title,DESC"
                    size="small"
                    sx={{ marginLeft: '-4px', marginRight: '-4px' }}
                  />
                }
                label={
                  <span style={{ color: "hsl(0, 0%, 48%)", fontSize: "12px" }}>Z-A</span>
                }
              />

              <FormControlLabel
                name="radioSort"
                control={
                  <Radio
                    disableRipple
                    id="price-asc"
                    onChange={handleChange}
                    value="price,ASC"
                    size="small"
                    sx={{ marginLeft: '-4px', marginRight: '-4px' }}
                  />
                }
                label={
                  <span style={{ color: "gray", fontSize: "12px" }}>$-$$$</span>
                }
              />

              <FormControlLabel
                name="radioSort"
                control={
                  <Radio
                    disableRipple
                    id="price-desc"
                    onChange={handleChange}
                    value="price,DESC"
                    size="small"
                    sx={{ marginLeft: '-4px', marginRight: '-4px' }}
                  />
                }
                label={
                  <span style={{ color: "hsl(0, 0%, 48%)", fontSize: "12px" }}>$$$-$</span>
                }
              />

              <FormControlLabel
                name="radioSort"
                control={
                  <Radio
                    disableRipple
                    id="releaseDate-desc"
                    onChange={handleChange}
                    value="releaseDate,DESC"
                    size="small"
                    sx={{ marginLeft: '-4px', marginRight: '-4px' }}
                  />
                }
                label={
                  <span style={{ color: "hsl(0, 0%, 48%)", fontSize: "12px" }}>
                    New
                  </span>
                }
              />

              <FormControlLabel
                name="radioSort"
                control={
                  <Radio
                    disableRipple
                    id="releaseDate-asc"
                    onChange={handleChange}
                    value="releaseDate,ASC"
                    size="small"
                    sx={{ marginLeft: '-4px', marginRight: '-4px' }}
                  />
                }
                label={
                  <span style={{ color: "hsl(0, 0%, 48%)", fontSize: "12px" }}>
                    Old
                  </span>
                }
              />
            </RadioGroup>
        </FormControl>
      </div>
      </div>
  );
};

export default SortOptions;
