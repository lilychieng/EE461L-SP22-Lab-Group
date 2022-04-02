// import React from "react";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ItemCard from "../Item";

export default function Inventory() {
  const [keyword, setKeyword] = useState();
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };


  return (
    <>
      <TextField
        label="Search"
        fullWidth
        onChange={handleSearch}
      />
      <Box>
        <Grid>
          <ItemCard />
        </Grid>
      </Box>
    </>
  );
}
