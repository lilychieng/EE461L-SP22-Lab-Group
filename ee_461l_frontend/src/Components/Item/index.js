import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../css/App.css";
import CheckoutModal from "../Modals/CheckoutModal";
import ReturnModal from "../Modals/ReturnModal";

function ItemCard({ item, proj_id }) {
  const [open, setOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleReturnModalOpen = () => setReturnModalOpen(true);

  return (
    <>
      <CheckoutModal item={item} setOpen={setOpen} open={open} />
      <ReturnModal
        item={item}
        setReturnModalOpen={setReturnModalOpen}
        returnModalOpen={returnModalOpen}
      />
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
            {item.availability} / {item.capacity} Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {console.log(item.projects.find(project => project.project_id === proj_id ).checked_out)}
            {item.projects.find(project => project.project_id === proj_id ).checked_out} Checked Out
          </Typography>
        </CardContent>
        <Button size="small" onClick={handleOpen}>
          Check Out
        </Button>
        - or -
        <Button size="small" onClick={handleReturnModalOpen}>
          Return{" "}
        </Button>
      </Card>
    </>
  );
}

export default ItemCard;
