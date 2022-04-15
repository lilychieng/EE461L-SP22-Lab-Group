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

function ItemCard({ item, proj_id, reload, setReload }) {
  const [open, setOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleReturnModalOpen = () => setReturnModalOpen(true);

  return (
    <>
      <CheckoutModal
        item={item}
        setOpen={setOpen}
        open={open}
        reload={reload}
        setReload={setReload}
        proj_id={proj_id}
      />
      <ReturnModal
        item={item}
        proj_id={proj_id}
        setReturnModalOpen={setReturnModalOpen}
        returnModalOpen={returnModalOpen}
        reload={reload}
        setReload={setReload}
      />
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={"public/images/"+item.name+".jpg"} //TODO: get this from backend later
          // frontend/src/Components/Item
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.availability} / {item.capacity} Available
          </Typography>
          <Typography variant="body2" color="red">
            {
              item.projects.find((project) => project.project_id === proj_id)
                .checked_out
            }{" "}
            Checked Out
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
