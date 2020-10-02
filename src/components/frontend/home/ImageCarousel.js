import React from "react";
import Carousel from "react-material-ui-carousel";
import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const imgs = [
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1601011983_33_Web_Home.jpg",
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1600705620_50_Web_Home.jpg",
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1601021887_Buy-Big-Save-Bigger_Web_Home.jpg",
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1601406712_Web-Home.jpg",
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1601403018_Hyderabad_Web.jpg",
];

const imgsSm = [
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1601402077_Kohinoor_Mobile_Home.jpg",
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1601011959_33_Mobile_Mini_and_Home.jpg",
  "https://www.jiomart.com/images/cms/aw_rbslider/slides/1600705684_50_Msite_Home_Mini.jpg",
];

const useStyles = makeStyles((theme) => ({
  imgStyles: {
    width: "100%",
  },
  indicatorContainerPropsSM: {
    display: "none",
  },
}));

function ImageCarousel() {
  const classes = useStyles();
  return (
    <>
      <Hidden xsDown>
        <Carousel animation="slide">
          {imgs.map((img, idx) => (
            <img
              key={idx}
              className={classes.imgStyles}
              src={img}
              alt="banner"
            />
          ))}
        </Carousel>
      </Hidden>
      <Hidden smUp>
        <Carousel
          indicatorContainerProps={{
            className: classes.indicatorContainerPropsSM,
          }}
          indicators="false"
          animation="slide"
        >
          {imgsSm.map((img, idx) => (
            <img
              key={idx}
              className={classes.imgStyles}
              src={img}
              alt="banner"
            />
          ))}
        </Carousel>
      </Hidden>
    </>
  );
}

export default ImageCarousel;
