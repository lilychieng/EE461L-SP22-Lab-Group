import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../../css/App.css";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const itemsNotInProject = ["TM4C", "Test", "Teste"];

function NewItem() {
  const [item, setItem] = useState("");
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };
  return (
    <Card>
      <Typography gutterBottom variant="h5" component="div">Add New Item</Typography>
      <CardContent>
        <TextField
          id="outlined-select-group"
          select
          label="New Item"
          value={item}
          onChange={handleItemChange}
          helperText='Select a new Item to add to the Project'
        >
          {itemsNotInProject.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Typography>There are 30 available</Typography>
        <TextField label="# to Checkout" fullWidth />
      </CardContent>
      <CardActions>
        <Button size="small">Check Out</Button>
      </CardActions>
    </Card>
  );
}

export default NewItem;
