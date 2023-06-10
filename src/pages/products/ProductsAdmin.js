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

  const handleSortByNumAsc = (num) => {
    const sortedData = [...products.content].sort((a, b) => {
      return a[num] - b[num];
    });
    setSortedProducts(sortedData);
    setSortFirstLastFlag(true);
  };

  const handleSortByNumDesc = (num) => {
    const sortedData = [...products.content].sort((a, b) => {
      return b[num] - a[num];
    });
    setSortedProducts(sortedData);
    setSortFirstLastFlag(false);
  };

  const alphanumericSort = (a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  };

  const handleSortByTitleAsc = () => {
    const sortedData = [...products.content].sort(alphanumericSort);
    setSortedProducts(sortedData);
    setSortFirstLastFlag(true);
  };

  const handleSortByTitleDesc = () => {
    const sortedData = [...products.content].sort((a, b) =>
      alphanumericSort(b, a)
    );
    setSortedProducts(sortedData);
    setSortFirstLastFlag(false);
  };

  const handleSortByReleaseDateAsc = () => {
    const sortedData = [...products.content].sort((a, b) => {
      const dateA = parseInt(a.releaseDate.replace(/-/g, ""), 10);
      const dateB = parseInt(b.releaseDate.replace(/-/g, ""), 10);
      return dateA - dateB;
    });
    setSortedProducts(sortedData);
    setSortFirstLastFlag(true);
  };

  const handleSortByReleaseDateDesc = () => {
    const sortedData = [...products.content].sort((a, b) => {
      const dateA = parseInt(a.releaseDate.replace(/-/g, ""), 10);
      const dateB = parseInt(b.releaseDate.replace(/-/g, ""), 10);
      return dateB - dateA;
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
            <th className="has-text-centered has-background-grey-light">
              <p>{totalElements}</p>
              <p>Ct.</p>
            </th>
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
            <th>
              {" "}
              <div
                className="button"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByTitleAsc()
                    : handleSortByTitleDesc()
                }
              >
                Title
              </div>
            </th>
            <th>
              {" "}
              <div
                className="button"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByReleaseDateAsc()
                    : handleSortByReleaseDateDesc()
                }
              >
                Rel. Date
              </div>
            </th>
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
            <th className="has-text-centered">Tagline</th>
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
              <td>{product?.price.toFixed(2)}</td>
              <td className="is-size-7">{product.tagline}</td>
              <td className="is-size-7">{product.overview}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="has-background-grey-lighter">
          <tr>
            <th className="has-text-centered">EDIT?</th>
            <th className="has-text-centered">ID</th>
            <th className="has-text-centered">Title</th>
            <th className="has-text-centered">Rel. Date</th>
            <th className="has-text-centered">Runtime (min)</th>
            <th className="has-text-centered">Pop. TMBD</th>
            <th className="has-text-centered">Price</th>
            <th className="has-text-centered">Tagline</th>
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
