import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ItemCard from "../Item";

/*
 * data is a temp variable to mock the HWSets recieved from the Backend
 */
const data = [
  { name: "TM4C", capacity: 200, avail: 120, class: "EE 319K", img: "" },
  { name: "Basys", capacity: 250, avail: 100, class: "EE 316", img: "" },
  { name: "Breadboard", capacity: 500, avail: 321, class: "EE 319K", img: "" },
  { name: "Wires", capacity: 1200, avail: 1103, class: "EE 316", img: "" },
  { name: "Capacitors", capacity: 200, avail: 143, class: "EE 319K", img: "" },
  { name: "Arduino Uno", capacity: 429, avail: 123, class: "EE 316", img: "" },
  { name: "Raspberry Pi", capacity: 842, avail: 624, class: "EE 316", img: "" },
];

export default function Inventory() {
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState();

  // const handleSearch = (e) => {
  //   setKeyword(e.target.value);

  // };

  const handleSearch = (e) => {
    let keyword = e.target.value;
    console.log(keyword);
    let tmp = data.filter(function (item) {
      return (
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.class.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setItemsToDisplay(tmp);
  };

  useEffect(() => {
    setItems(data);
    setItemsToDisplay(data);
  }, []);

  return (
    <>
      <TextField label="Search" fullWidth onChange={handleSearch} />
      <Box>
        {itemsToDisplay.map((item, i) => (
          <li style={{'listStyleType': 'none'}} key={i}>{<ItemCard item={item} />}</li>
        ))}
      </Box>
    </>
  );
}
