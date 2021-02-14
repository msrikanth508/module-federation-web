import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import data from "./data/ads";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: 550,
  },
});

export default function AdDetails() {
  const classes = useStyles();
  const params = useParams();
  const { id } = params;
  const ad = data.ads.find((_) => _.id == id);

  if (ad)
    return (
      <Card className={classes.root} key={ad.id}>
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
    );

  return <>No ad found!</>;
}
