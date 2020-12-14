import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import CategoriesBox from "../category/CategoriesBox";
import ProductGrid from "./ProductGrid";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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
  searchHead: {
    boxSizing: "border-box",
    padding: theme.spacing(2),
    paddingLeft: 0,
    fontSize: 16,
    fontWeight: 400,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
}));

function SearchProduct(props) {
  const classes = useStyles();
  const search = props.match.params.searchParam;

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
            <span className={classes.searchHead}>
              Showing all results for{" "}
              <span className={classes.searchTitle}>{search}</span>
            </span>
            {props.products && <ProductGrid data={props.products} />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.products,
    categories: state.firestore.ordered.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    var search = props.match.params.searchParam;
    return [
      {
        collection: "products",
        where: [
          ["title", ">=", search],
          ["title", "<=", search + "\uf8ff"],
        ],
      },
    ];
  })
)(SearchProduct);
