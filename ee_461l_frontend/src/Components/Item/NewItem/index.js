import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../../css/App.css";
import { Alert, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const itemsNotInProject = [
  { name: "TM4C", avail: 200 },
  { name: "Teste", avail: 532 },
  { name: "Tests", avail: 239 },
];

function NewItem() {
  const regexNumber = /^[0-9\b]+$/;
  const checkoutNum = useRef(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [item, setItem] = useState("");
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleCheckOut = () => {
    setError(false);
    if(item === ""){
      setError(true);
      return setErrorMessage("An item must be selected");
    }
    else if (!regexNumber.test(checkoutNum.current)) {
      setError(true);
      return setErrorMessage("Checkout must be a valid number");
    } else if (parseInt(checkoutNum.current) > item.avail) {
      setError(true);
      return setErrorMessage(
        `You cannot checkout more than ${item.avail} items`
      );
    }
  };
  return (
    <Card>
      <Typography gutterBottom variant="h5" component="div">
        Add New Item
      </Typography>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <CardContent>
        <TextField
          id="outlined-select-group"
          select
          label="New Item"
          value={item}
          onChange={handleItemChange}
          helperText="Select a new Item to add to the Project"
        >
          {itemsNotInProject.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        {item !== "" && (
          <>
            <Typography>There are {item.avail} available</Typography>
            <TextField
              label="# to Checkout"
              fullWidth
              onChange={(e) => (checkoutNum.current = e.target.value)}
            />
            <CardActions>
              <Button size="small" onClick={handleCheckOut}>
                Check Out
              </Button>
            </CardActions>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default NewItem;
