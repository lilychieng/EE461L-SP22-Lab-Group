import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../css/App.css"

function ItemCard({item}) {
  return (
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
          <Button size="small">Check Out</Button>
          <Button size="small">Return </Button>
        </CardActions>
      </Card>
  );
}

export default ItemCard;
