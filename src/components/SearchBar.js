//Searchbar.js

import React from "react";
import "../styles/SearchBar.css";
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  onSearch(newSearchTerm);
  };

  return (
    <div className="SearchContainer">
    <input
      type="text"
      id="search"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search By Name Email and Role"
    />
  </div>
  );
};

export default SearchBar;
