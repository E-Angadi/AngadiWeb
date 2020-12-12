import React from "react";
import { Hidden, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  imgStyles: {
    width: "100%",
    height: "calc(100vw*0.2)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vw*0.42)",
    },
  },
}));

function RMCarousel(props) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <Carousel
          animation="slide"
          indicatorContainerProps={{
            style: {
              marginTop: -45,
            },
          }}
          activeIndicatorProps={{
            style: {
              color: theme.palette.primary.main,
            },
          }}
        >
          {props.banners &&
            props.banners.map((banner, idx) => (
              <Item key={idx} link={banner.link} src={banner.imageURL} alt="" />
            ))}
        </Carousel>
      </Hidden>
      <Hidden smUp>
        <Carousel animation="slide" indicators={false}>
          {props.banners &&
            props.banners.map((banner, idx) => (
              <Item
                key={idx}
                link={banner.link}
                src={banner.mobileImageURL}
                alt=""
              />
            ))}
        </Carousel>
      </Hidden>
    </div>
  );
}

function Item(props) {
  const classes = useStyles();
  return (
    <a href={props.link} target="blank">
      <img className={classes.imgStyles} src={props.src} alt={props.alt} />
    </a>
  );
}

const mapStateToProps = (state) => {
  return {
    banners: state.firestore.ordered.banners,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "banners" }])
)(RMCarousel);
