import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { makeStyles } from "@material-ui/core/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { loadSpecials } from "../../../store/actions/productActions";

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
      marginRight: 10,
    },
  },
}));

function ProductSwiper(props) {
  const classes = useStyles();
  const { title } = props;

  useEffect(() => {
    props.loadSpecials();
  }, []);

  return (
    <div className={classes.white}>
      <span className={classes.titleSpan}>{title}</span>
      <Button component={Link} to="/deals" className={classes.viewall}>
        View All
      </Button>
      <Swiper
        className={classes.root}
        slidesPerView={"auto"}
        autoHeight={true}
        navigation
      >
        {props.special &&
          props.special.map((productData, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard productData={productData} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    special: state.product.specials,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    loadSpecials: () => dispatch(loadSpecials()),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(ProductSwiper);
