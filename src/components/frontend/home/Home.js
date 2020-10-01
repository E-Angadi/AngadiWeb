import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCarousel from "./ImageCarousel";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageCarousel />
    </div>
  );
}

export default Home;
