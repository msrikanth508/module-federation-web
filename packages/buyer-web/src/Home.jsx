import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import data from "./data/ads";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-evenly">
      {(data.ads || []).map((ad) => (
        <NavLink
          to={`/ad/${ad.id}`}
          style={{
            textDecoration: "none",
          }}
          key={ad.id}
        >
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={ad.image}
                title={ad.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {ad.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {ad.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </NavLink>
      ))}
    </Box>
  );
}
