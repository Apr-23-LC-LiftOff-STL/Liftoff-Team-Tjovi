import { useState, useEffect } from "react";
import { Fade } from "@mui/material";
import posterNA from "./posterNA.jpg";
import axios from "axios";
import "./OrderHistory.css";

const OrderHistorySubItem = ({ movieId, count, totalPrice }) => {
  const [productData, setProductData] = useState();

  const baseImgUrl = "https://image.tmdb.org/t/p/w300";
  const baseProductUrl = "/products/";
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
      <td>
        {" "}
        <a href={`${baseProductUrl}${movieId}`}>
        <Fade in timeout={500}>
          <div
            style={{ width: "30px", marginLeft: "auto", marginRight: "auto" }}
          >

            {productData?.posterPath && (
              <img
                className="image"
                src={`${baseImgUrl}${productData?.posterPath}`}
                alt={`Poster for ${productData?.title}`}
                style={{
                  borderStyle: "solid",
                  borderColor: "darkgray",
                  borderWidth: "1px",
                }}
              />
            )}
          </div>
          </Fade>
          <div>
            {!productData?.posterPath && (
              <img
                className="image"
                src={posterNA}
                alt={`no poster available for ${productData?.title}`}
                style={{
                  borderStyle: "solid",
                  borderColor: "darkgray",
                  borderWidth: "1px",
                }}
              />
            )}
          </div>
        </a>
      </td>

      <td className="has-text-left">
        <a href={`${baseProductUrl}${movieId}`}>
          {createShortcut(productData?.title, 50)}
        </a>
      </td>

      <td className="has-text-right">
        {currencySymbol}
        {(totalPrice/count).toFixed(2)}
      </td>
      <td className="has-text-centered">{count}</td>
      <td className="has-text-right">${totalPrice?.toFixed(2)}</td>
    </tr>
  );
};

export default OrderHistorySubItem;
