import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import useAbility from "../hooks/useAbility";

const BookCard = ({ book }) => {
  const ability = useAbility();

  if (!ability) {
    return null; // or some fallback UI
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author}
        </Typography>
      </CardContent>
      <CardActions>
        {ability.can("update", book) && <Button size="small">Edit</Button>}
        {ability.can("delete", book) && <Button size="small">Delete</Button>}
      </CardActions>
    </Card>
  );
};

export default BookCard;
