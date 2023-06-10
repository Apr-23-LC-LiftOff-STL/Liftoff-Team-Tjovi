import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Pagination } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductsAdmin() {
  const products = useLoaderData();
  const navigate = useNavigate();

  const [sortedProducts, setSortedProducts] = useState(products.content);
  const [sortFirstLastFlag, setSortFirstLastFlag] = useState(false);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState();

  useEffect(() => {
    setPage(0);
    setTotalElements(products.content.length);
    setSortedProducts(products.content.slice(0, productsPerPage));
  }, [products]);

  const productsPerPage = 10000;

  console.log(JSON.stringify(products.content));

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const handleNavigate = (id) => {
    navigate("./" + id);
  };

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };

  const handleSortByNumAsc = (key) => {
    const sortedData = [...products.content].sort((a, b) => {
      return a[key] - b[key];
    });
    setSortedProducts(sortedData);
    setSortFirstLastFlag(true);
  };

  const handleSortByNumDesc = (key) => {
    const sortedData = [...products.content].sort((a, b) => {
      return b[key] - a[key];
    });
    setSortedProducts(sortedData);
    setSortFirstLastFlag(false);
  };

  

  return (
    <div>
      <Box
        className="mx-4"
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "left",
          flex: "1 1 auto",
        }}
      >
{/*         <Pagination
          disableRipple
          count={Math.ceil(sortedProducts.length / productsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          siblingCount={1}
          boundaryCount={1}
          shape="rounded"
        /> */}
      </Box>
      <table className="table is-striped is-bordered my-2 mx-4">
        <thead className="has-background-grey-lighter">
          <tr>
            <th>{totalElements} CT.</th>
            <th>
              {" "}
              <div
                className="button"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByNumAsc("id")
                    : handleSortByNumDesc("id")
                }
              >
                ID
              </div>
            </th>
            <th>Title</th>
            <th>Rel. Date</th>
            <th>
              {" "}
              <div
                className="button"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByNumAsc("runtime")
                    : handleSortByNumDesc("runtime")
                }
              >
                Runtime
              </div>
            </th>
            <th>
              {" "}
              <div
                className="button"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByNumAsc("popularity")
                    : handleSortByNumDesc("popularity")
                }
              >
                Pop. TMBD
              </div>
            </th>
            <th>
              {" "}
              <div
                className="button"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByNumAsc("price")
                    : handleSortByNumDesc("price")
                }
              >
                Price $
              </div>
            </th>
            <th>Tagline</th>
            <th>Overview</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div
                  className="button is-small is-warning"
                  onClick={() => handleNavigate(product.id)}
                >
                  EDIT
                </div>
              </td>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.releaseDate}</td>
              <td>{product.runtime}</td>
              <td>{product.popularity}</td>
              <td>{product.price}</td>
              <td className="is-size-7">{product.tagline}</td>
              <td className="is-size-7">{product.overview}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="has-background-grey-lighter">
          <tr>
            <th>EDIT?</th>
            <th>ID</th>
            <th>Title</th>
            <th>Rel. Date</th>
            <th>Runtime (min)</th>
            <th>Pop. TMBD</th>
            <th>Price</th>
            <th>Tagline</th>
            <th>Overview</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// data loader
export const productsLoaderAdmin = async () => {
  const res = await fetch("http://localhost:8080/movies");

  if (!res.ok) {
    throw Error("Could not fetch the list of products");
  }

  return res.json();
};
