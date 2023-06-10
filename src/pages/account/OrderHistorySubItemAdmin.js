import { useState, useEffect } from "react";
import { Fade } from "@mui/material";
import posterNA from "./posterNA.jpg";
import axios from "axios";
import "./OrderHistory.css";
import DownloadDialog from "./DownloadDialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const OrderHistorySubItem = ({ movieId, count, totalPrice }) => {
  const [productData, setProductData] = useState();
  const [showDialog, setShowDialog] = useState(false);

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const baseProductUrl = "/admin/products/";
  const currencySymbol = "$";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/movies/${movieId}`
        );
        const { title, releaseDate, posterPath, price } = response.data;
        setProductData({ title, releaseDate, posterPath, price });
      } catch (error) {
        console.log(`Error fetching data for movie with ID ${movieId}:`, error);
      }
    };

    fetchData();
  }, [movieId]);

  const expression = /\s[^\s]*$/;

  const createShortcut = (text, limit) => {
    if (text?.length > limit) {
      const part = text.slice(0, limit - 3);
      if (part.match(expression)) {
        return part.replace(expression, "...");
      }
      return part + "...";
    }
    return text;
  };

  return (
    <tr>

      <td className="has-text-centered">
      <a href={`${baseProductUrl}${movieId}`}>
          {createShortcut(productData?.title, 30)}
        </a>
        {" "}

      </td>

      <td className="has-text-right">
        {currencySymbol}
        {(totalPrice / count).toFixed(2)}
      </td>
      <td className="has-text-centered">{count}</td>
      <td className="has-text-left">${totalPrice?.toFixed(2)}</td>
    </tr>
  );
};

export default OrderHistorySubItem;
