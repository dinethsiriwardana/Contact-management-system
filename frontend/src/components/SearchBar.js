import React from "react";
import { TextField } from "@mui/material";

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <TextField
      fullWidth
      label="Search Contacts"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      variant="outlined"
    />
  );
}

export default SearchBar;
