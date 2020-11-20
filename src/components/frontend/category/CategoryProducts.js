import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import CategoriesBox from "./CategoriesBox";
import ProductGrid from "../product/ProductGrid";

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

const searchCategory = (categories, id) => {
  if (!categories) return ["", ""];
  var category = categories.find((x) => x.id === id);
  if (category) {
    return [category.bannerImageURL, category.description];
  } else {
    return ["", ""];
  }
};

function CategoryProducts(props) {
  const classes = useStyles();
  const [imageURL, description] = searchCategory(
    props.categories,
    props.match.params.categoryId
  );
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
            <img
              className={classes.banner}
              src={imageURL}
              alt={"Fresh Fruits"}
            />
            <div className={classes.description}>{description}</div>
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
    categories: state.category.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "products",
        where: [["category", "==", props.match.params.categoryId]],
      },
    ];
  })
)(CategoryProducts);
