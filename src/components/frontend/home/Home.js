import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RMCarousel from "./RMCarousel";
import CategorySwiper from "../category/CategorySwiper";
import ProductSwiper from "../product/ProductSwiper";
import ScrollToTop from "../../common/ScrollToTop";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingBottom: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ScrollToTop />
      <RMCarousel />
      <ProductSwiper title={"Top Deals"} />
      <CategorySwiper />
    </div>
  );
}

export default Home;
