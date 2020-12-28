import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import ProductGrid from "../product/ProductGrid";
import CartBox from "../cart/CartBox";

import { useFirestoreConnect } from "react-redux-firebase";
import { configs } from "../../../config/configs";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
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
  const [page, setPage] = useState(1);

  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.firestore.ordered.products);
  useFirestoreConnect([
    {
      collection: "products",
      where: [["category", "==", props.match.params.categoryId]],
      orderBy: [
        ["title", "asc"],
        ["discount", "asc"],
      ],
      limit: configs.maxPageCards,
    },
  ]);

  const [imageURL, description] = searchCategory(
    categories,
    props.match.params.categoryId
  );
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Hidden smDown>
          <Grid item md={2}>
            <CartBox />
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
            {products && <ProductGrid data={products} />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CategoryProducts;
