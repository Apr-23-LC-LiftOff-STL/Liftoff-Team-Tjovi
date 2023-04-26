//Navigation component imports
import Navbar from "./Components/Navbar/Navbar";
import Sortbar from "./Components/Sortbar/Sortbar";
import PaginationBulma from "./Components/Pagination/PaginationBulma";
import Footer from "./Components/Footer/Footer";

//MovieCardApp component-related imports
import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieCardApp from "./Components/MovieCard/MovieCardApp.js";
import ReactPaginate from "react-paginate";

const App = () => {
  return (
    <div className="body">
      <Navbar />
      <Sortbar />
      <MovieCardApp />
      <PaginationBulma />
      <Footer />
    </div>
  );
}

export default App;
