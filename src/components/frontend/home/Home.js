import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCarousel from "./ImageCarousel";
import CategorySwiper from "../category/CategorySwiper";
import ProductSwiper from "../product/ProductSwiper";

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
      <ProductSwiper title={"Top Deals"} />
      <CategorySwiper />
    </div>
  );
}

export default Home;
