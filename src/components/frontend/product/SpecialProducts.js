import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import CategoriesBox from "../category/CategoriesBox";
import ProductGrid from "./ProductGrid";

import { connect } from "react-redux";

import { loadSpecials } from "../../../store/actions/productActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  main: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  banner: {
    height: "auto",
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    minWidth: 0,
  },
  description: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    fontSize: 18,
    fontWeight: 300,
    backgroundColor: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    marginBottom: theme.spacing(1),
    fontStyle: "italic",
    boxSizing: "border-box",
  },
}));

function SpecialProducts(props) {
  const classes = useStyles();

  useEffect(() => {
    props.loadSpecials();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Hidden smDown>
          <Grid item md={2}>
            <CategoriesBox />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={10} container>
          <div className={classes.main}>
            {props.products && <ProductGrid data={props.products} />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.product.specials,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    loadSpecials: () => dispatch(loadSpecials()),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(SpecialProducts);
