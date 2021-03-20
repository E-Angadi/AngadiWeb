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
import { configs } from "../../../config/configs";
import Skeleton from "@material-ui/lab/Skeleton";

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
    clear: "both",
  },
  viewall: {
    float: "right",
    color: configs.viewall,
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
    clear: "both",
  },
  spacer: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  float: {
    display: "float",
  },
}));

function ProductSwiper(props) {
  const classes = useStyles();
  const { title } = props;

  useEffect(() => {
    props.loadSpecials(20);
  }, []);

  return (
    <div className={classes.white}>
      <span className={classes.titleSpan}>{title}</span>
      <Button component={Link} to="/deals" className={classes.viewall}>
        View All
      </Button>

      {!props.special.length && (
        <Skeleton
          variant="rect"
          height={300}
          width={200}
          className={classes.spacer}
        />
      )}

      {props.special && (
        <Swiper
          className={classes.root}
          slidesPerView={"auto"}
          navigation
          height={300}
        >
          {props.special.map((productData) => {
            if (productData.visibility) {
              return (
                <SwiperSlide key={productData.id}>
                  <ProductCard productData={productData} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      )}
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
    loadSpecials: (limit) => dispatch(loadSpecials(limit)),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(ProductSwiper);
