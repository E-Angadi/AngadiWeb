import React from "react";
import ProductCard from "./ProductCard";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { makeStyles } from "@material-ui/core/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@material-ui/core";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  titleSpan: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  white: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  viewall: {
    float: "right",
    color: "#900325",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontWeight: 600,
    },
  },
  root: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
    "& .swiper-slide": {
      width: "auto",
    },
  },
}));

const data = [
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491186625/good-life-almonds-500-g-0-20200901.jpg",
    name: "Good Life Almonds",
    discount: 25,
    price: 449,
    variant: "500gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491337398/sunfeast-yippee-magic-masala-instant-noodles-360-g-0-20200621.jpeg",
    name: "Sunfeast Yippee Magic Masala Instant Noodles",
    discount: 17,
    price: 68,
    variant: "230gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/490001392/amul-pasteurised-butter-500-g-0-20200621.jpeg",
    name: "Amul Pasteurised Butter",
    variant: "1kg",
    discount: 6,
    price: 449,
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491186625/good-life-almonds-500-g-0-20200901.jpg",
    name: "Good Life Almonds",
    discount: 25,
    price: 449,
    variant: "500gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491337398/sunfeast-yippee-magic-masala-instant-noodles-360-g-0-20200621.jpeg",
    name: "Sunfeast Yippee Magic Masala Instant Noodles",
    discount: 17,
    price: 68,
    variant: "230gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/490001392/amul-pasteurised-butter-500-g-0-20200621.jpeg",
    name: "Amul Pasteurised Butter",
    variant: "1kg",
    discount: 6,
    price: 449,
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491186625/good-life-almonds-500-g-0-20200901.jpg",
    name: "Good Life Almonds",
    discount: 25,
    price: 449,
    variant: "500gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491337398/sunfeast-yippee-magic-masala-instant-noodles-360-g-0-20200621.jpeg",
    name: "Sunfeast Yippee Magic Masala Instant Noodles",
    discount: 17,
    price: 68,
    variant: "230gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/490001392/amul-pasteurised-butter-500-g-0-20200621.jpeg",
    name: "Amul Pasteurised Butter",
    variant: "1kg",
    discount: 6,
    price: 449,
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491337398/sunfeast-yippee-magic-masala-instant-noodles-360-g-0-20200621.jpeg",
    name: "Sunfeast Yippee Magic Masala Instant Noodles",
    discount: 17,
    price: 68,
    variant: "230gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/490001392/amul-pasteurised-butter-500-g-0-20200621.jpeg",
    name: "Amul Pasteurised Butter",
    variant: "1kg",
    discount: 6,
    price: 449,
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/491337398/sunfeast-yippee-magic-masala-instant-noodles-360-g-0-20200621.jpeg",
    name: "Sunfeast Yippee Magic Masala Instant Noodles",
    discount: 17,
    price: 68,
    variant: "230gm",
    discountedPrice: 333,
  },
  {
    img:
      "https://www.jiomart.com/images/product/150x150/490001392/amul-pasteurised-butter-500-g-0-20200621.jpeg",
    name: "Amul Pasteurised Butter",
    variant: "1kg",
    discount: 6,
    price: 449,
    discountedPrice: 333,
  },
];

function ProductSwiper() {
  const classes = useStyles();
  return (
    <div className={classes.white}>
      <span className={classes.titleSpan}>Top Deals</span>
      <Button className={classes.viewall}>View All</Button>
      <Swiper
        className={classes.root}
        spaceBetween={10}
        slidesPerView={"auto"}
        autoHeight={true}
        navigation
      >
        {data.map((productData, idx) => (
          <SwiperSlide key={idx}>
            <ProductCard productData={productData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSwiper;
