import React from "react";
import { makeStyles, Button, Box, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "10px",
      width: "25ch",
    },
    "& > button  a": {
      color: "inherit",
      textDecoration: "none",
    },
  },
});

export default function Posting() {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-evenly">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Title" />
        <TextField id="standard-basic" label="Price" />
        <Button variant="contained" color="primary">
          <NavLink to="/seller/ads/1234">Post</NavLink>
        </Button>
      </form>
    </Box>
  );
}
