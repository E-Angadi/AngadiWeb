import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import CategoriesBox from "../category/CategoriesBox";
import ProductGrid from "./ProductGrid";

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

const searchFilter = (data, search) => {
  const res = data.filter((obj) =>
    obj.name.toLowerCase().includes(search.toLowerCase())
  );
  return res;
};

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
            <ProductGrid data={searchFilter(data, search)} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchProduct;
