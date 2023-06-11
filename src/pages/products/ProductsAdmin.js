import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Pagination } from "@mui/material";
import axios from "axios";
import ProductsAdminDialogDelete from "./ProductsAdminDialogDelete";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import { useMovieCountStore } from "../../store/movieCountStore";

export default function ProductsAdmin() {
  const products = useLoaderData();
  const navigate = useNavigate();

  const movieCountGlobal = useMovieCountStore((state) => state.movieCountGlobal);
  const setMovieCountGlobal = useMovieCountStore((state) => state.setMovieCountGlobal);

  const [sortedProducts, setSortedProducts] = useState(products.content);
  const [sortFirstLastFlag, setSortFirstLastFlag] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
    setMovieCountGlobal(products.content.length);
    setSortedProducts(products.content.slice(0, productsPerPage));
  }, [products]);

  const productsPerPage = movieCountGlobal;

  console.log(JSON.stringify(products.content));

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";

  const handleNavigate = (id) => {
    navigate("./" + id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/admin/deleteMovie/" + id);
      alert("ID # " + id + " deleted from database");
      navigate(0);
    } catch (error) {
      console.log("Error deleting movie: ", error);
    }
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
      <div className="is-size-6 ml-6 mt-2">PRODUCT DASHBOARD</div>
      <table className="table is-striped is-bordered my-2 mx-1 card">
        <thead className="has-background-grey-lighter">
          <tr>
            <th className="is-size-7 has-text-centered has-background-primary-light">
              <p>{movieCountGlobal}</p>
              <p>Ct.</p>
            </th>
            <th>
              {" "}
              <div
                className="button is-small"
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
                className="button is-small"
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
                className="button is-small"
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
                className="button is-small"
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
                className="button is-small"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByNumAsc("popularity")
                    : handleSortByNumDesc("popularity")
                }
              >
                Vote Avg
              </div>
            </th>
            <th>
              {" "}
              <div
                className="button is-small"
                onClick={() =>
                  !sortFirstLastFlag
                    ? handleSortByNumAsc("price")
                    : handleSortByNumDesc("price")
                }
              >
                Price $
              </div>
            </th>
            <th className="is-size-7 has-text-centered">Poster Path</th>
            <th className="is-size-7 has-text-centered">Tagline</th>
            <th className="is-size-7">Overview</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td className="has-text-centered">
                <div
                  className="button is-small is-rounded is-warning"
                  onClick={() => handleNavigate(product.id)}
                >
                  EDIT
                </div>
                <div
                  className="button is-small is-rounded is-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  DEL
                </div>
              </td>
              <td className="is-size-7 has-text-right">{product.id}</td>
              <td className="is-size-7 has-text-left">{product.title}</td>
              <td className="is-size-7 has-text-centered">
                {product.releaseDate}
              </td>
              <td className="is-size-7 has-text-right">{product.runtime}</td>
              <td className="is-size-7 has-text-right">{product.vote_average}</td>
              <td className="is-size-7 has-text-right">
                {product?.price.toFixed(2)}
              </td>
              <td className="is-size-7 has-text-right">{product.posterPath}</td>
              <td className="is-size-7 has-text-left">{product.tagline}</td>
              <td className="is-size-7 has-text-left">{product.overview}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="has-background-grey-lighter">
          <tr>
            <th className="is-size-7 has-text-centered has-background-primary-light">
              <p>{movieCountGlobal}</p>
              <p>Ct.</p>
            </th>
            <th className="is-size-7 has-text-centered">ID</th>
            <th className="is-size-7 has-text-centered">Title</th>
            <th className="is-size-7 has-text-centered">Rel. Date</th>
            <th className="is-size-7 has-text-centered">Runtime (min)</th>
            <th className="is-size-7 has-text-centered">Vote Avg</th>
            <th className="is-size-7 has-text-centered">Price</th>
            <th className="is-size-7 has-text-centered">Poster Path</th>
            <th className="is-size-7 has-text-centered">Tagline</th>
            <th className="is-size-7">Overview</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// data loader
export const productsLoaderAdmin = async (
  query = "",
  genres = [],
  pageNumber = 0,
  productsPerPage = 15000
) => {
  const res = await fetch(
    `http://localhost:8080/movies?title=${encodeURIComponent(
      ""
    )}&page=${pageNumber}&size=${productsPerPage}`
  );

  if (!res.ok) {
    throw Error("Could not fetch the list of products");
  }

  return res.json();
};
