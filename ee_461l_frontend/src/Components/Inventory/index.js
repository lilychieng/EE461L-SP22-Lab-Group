import React, { useEffect, useState } from "react";
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

const projects = ["Test123", "Test429"];

export default function Inventory() {
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState();

  const handleSearch = (e) => {
    let keyword = e.target.value;
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
      <h2>My Dashboard</h2>
      <TextField
        label="Search"
        fullWidth
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />

      {projects.map((project, i) => (
        <>
          <h1>{project}</h1>
          <div
            className="card"
            style={{
              maxWidth: "1000px",
              display: "grid",
              gridGap: "1rem",
              margin: "0 auto",
              paddingBottom: "100px",
            }}
          >
            {itemsToDisplay.map((item, i) => (
              <li style={{ listStyleType: "none" }} key={i}>
                {<ItemCard item={item} />}
              </li>
            ))}
            <li>
              {
                <ItemCard
                  item={{
                    name: "Poop",
                    capacity: 200,
                    avail: 120,
                    class: "EE 319K",
                    img: "",
                  }}
                />
              }
            </li>
          </div>
        </>
      ))}
    </>
  );
}
