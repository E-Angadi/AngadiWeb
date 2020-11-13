import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Swiper from "react-id-swiper";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  imgStyles: {
    width: "100%",
  },
  swiperContainer: {
    width: "100%",
    minHeight: "19vw",
    "& .swiper-pagination-bullet-active": {
      background: theme.palette.primary.main,
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
    },
  },

  placeholder: {
    width: "100%",
    backgroundSize: "contains",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(/imgs/1680x320.png)",
  },
}));

const swiperParams = {
  spaceBetween: 30,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  rebuildOnUpdate: true,
};

const swiperParamsMobile = {
  spaceBetween: 30,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  autoHeight: true,
  rebuildOnUpdate: true,
};

function ImageCarousel(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.banners) {
      setImages(props.banners);
    }
  }, [props.banners]);

  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <div className={classes.swiperContainer}>
          <Swiper {...swiperParams} shouldSwiperUpdate>
            {images.map((img, idx) => (
              <a key={idx} target="blank" href={img.link}>
                <img
                  className={classes.imgStyles}
                  src={img.imageURL ? img.imageURL : "/imgs/1680x320.png"}
                  alt=""
                />
              </a>
            ))}
          </Swiper>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.swiperContainer}>
          <Swiper {...swiperParamsMobile} shouldSwiperUpdate>
            {images.map((img, idx) => (
              <div key={idx}>
                <a target="blank" href={img.link}>
                  <img
                    className={classes.imgStyles}
                    src={
                      img.mobileImageURL
                        ? img.mobileImageURL
                        : "/imgs/910x380.png"
                    }
                    alt="banner"
                  />
                </a>
              </div>
            ))}
          </Swiper>
        </div>
      </Hidden>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    banners: state.firestore.ordered.banners,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "banners" }])
)(ImageCarousel);
