import React from "react";
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

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

function ImageCarousel() {
  const classes = useStyles();
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
          {imgs.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img className={classes.imgStyles} src={img} alt="banner" />
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
          {imgsSm.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img className={classes.imgStyles} src={img} alt="banner" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Hidden>
    </div>
  );
}

export default ImageCarousel;
