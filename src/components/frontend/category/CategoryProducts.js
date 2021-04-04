import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import CartBox from "../cart/CartBox";
import ProductGrid from "../product/ProductGrid";
import Skeleton from "@material-ui/lab/Skeleton";

import { useFirestoreConnect } from "react-redux-firebase";
import { configs } from "../../../config/configs";
import { useSelector } from "react-redux";
import ScrollToTop from "../../common/ScrollToTop";

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
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  placeholder: {
    width: "100%",
    height: "14vw",
    [theme.breakpoints.down("sm")]: {
      height: "19vw",
    },
  },
}));

const searchCategory = (categories, id) => {
  if (!categories) return ["", ""];
  var category = categories.find((x) => x.id === id);
  if (category) {
    return [category.bannerImageURL, category.description, category.count];
  } else {
    return ["", ""];
  }
};

function CategoryProducts(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const cardsPerPage = configs.maxPageCards;
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.firestore.ordered.products);
  const [imgLoaded, setLoaded] = useState(false);

  useFirestoreConnect([
    {
      collection: "products",
      where: [["category", "==", props.match.params.categoryId]],
      orderBy: [
        ["visibility", "desc"],
        ["discount", "desc"],
        ["title", "asc"],
      ],
      limit: cardsPerPage * page,
    },
  ]);

  const [imageURL, description, count] = searchCategory(
    categories,
    props.match.params.categoryId
  );

  const nextPage = (value) => {
    if (page * cardsPerPage < count) {
      setPage(value);
    }
  };

  return (
    <div className={classes.root}>
      <ScrollToTop />
      <Grid container spacing={2}>
        <Hidden smDown>
          <Grid item md={2}>
            <CartBox />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={10} container>
          <div className={classes.main}>
            {!imgLoaded && (
              <Skeleton
                animation="wave"
                variant="rect"
                className={classes.placeholder}
              />
            )}
            <img
              className={classes.banner}
              src={imageURL}
              onLoad={() => setLoaded(true)}
            />
            {description && (
              <div className={classes.description}>{description}</div>
            )}
            {products && (
              <ProductGrid
                data={products}
                page={page}
                nextPage={(value) => nextPage(value)}
                count={count}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CategoryProducts;
