import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../css/App.css";

function ItemCard({ item }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const checkout = useRef(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAvail = (e) => {
    console.log(checkout.current);
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Checkout for {item.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              There are {item.avail} {item.name} available.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Enter number {item.name} to checkout
            </Typography>
            <TextField
              label="# of items"
              fullWidth
              onChange={(e) => {checkout.current = e.target.value}}
              style={{ marginBottom: "20px" }}
            />
            <Button fullWidth onClick={handleAvail}>Checkout</Button>
          </Box>
        </Modal>
      </div>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://i.imgur.com/cn2Vlek.jpeg" //TODO: get this from backend later
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.class}: {item.avail}/{item.capacity} Available
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Check Out
          </Button>
          <Button size="small">Return </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ItemCard;
