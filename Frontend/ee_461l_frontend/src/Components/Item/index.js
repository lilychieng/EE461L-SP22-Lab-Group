import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ItemCard() {
  return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://i.imgur.com/cn2Vlek.jpeg" //TODO: get this from backend later
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            TM4C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            EE 319K : 5/19 Available
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
