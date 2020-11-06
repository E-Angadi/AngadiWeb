import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  imgStyles: {
    width: "100%",
  },
  swiper: {
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
    },
    "& .swiper-pagination-bullet-active": {
      background: theme.palette.primary.main,
    },
  },
}));

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
        <Swiper
          className={classes.swiper}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          autoHeight={true}
          navigation
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <a target="blank" href={img.link}>
                <img
                  className={classes.imgStyles}
                  src={img.imageURL ? img.imageURL : "/imgs/1680x320.png"}
                  alt="banner"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </Hidden>
      <Hidden smUp>
        <Swiper
          spaceBetween={30}
          autoHeight={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <a href={img.link}>
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
            </SwiperSlide>
          ))}
        </Swiper>
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
