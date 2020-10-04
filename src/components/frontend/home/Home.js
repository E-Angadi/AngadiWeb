import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCarousel from "./ImageCarousel";
import CategorySwiper from "../category/CategorySwiper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageCarousel />
      <CategorySwiper />
    </div>
  );
}

export default Home;
