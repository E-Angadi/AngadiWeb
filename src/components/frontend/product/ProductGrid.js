import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ProductCard from "../product/ProductCard";

const useStyles = makeStyles((theme) => ({
  productRoot: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
  },
  pagination: {
    margin: theme.spacing(1),
  },
  meta: {
    boxSizing: "border-box",
    padding: theme.spacing(2),
    paddingLeft: 0,
    fontSize: 16,
    fontWeight: 400,
  },
  pageCount: {
    fontSize: 20,
    fontWeight: 600,
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

const sliceProducts = (data, page, limit) => {
  const startIndex = limit * (page - 1);
  const totalPages = Math.ceil(data.length / limit);
  if (page !== totalPages) {
    return data.slice(startIndex, startIndex + limit);
  } else {
    return data.slice(startIndex, data.length);
  }
};

const getProductCountInPage = (data, page, limit) => {
  const startIndex = limit * (page - 1);
  const totalPages = Math.ceil(data.length / limit);
  if (data.length <= limit) {
    return data.length;
  }
  if (page !== totalPages) {
    return limit;
  } else {
    return data.length - startIndex;
  }
};

function ProductGrid() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const pageLimit = 25;

  return (
    <div>
      <div className={classes.meta}>
        Showing{" "}
        <span className={classes.pageCount}>
          {getProductCountInPage(data, page, pageLimit)}
        </span>{" "}
        of <span className={classes.pageCount}> {data.length}</span> items
      </div>
      <div className={classes.productRoot}>
        <Grid container spacing={1}>
          {sliceProducts(data, page, pageLimit).map((product, idx) => {
            return (
              <Grid key={idx} item xs={6} sm={4} md={3} xl={2}>
                <ProductCard
                  productData={product}
                  fullwidth={true}
                  titleLimit={50}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Pagination
              count={Math.ceil(data.length / pageLimit)}
              color="primary"
              variant="outlined"
              shape="rounded"
              page={page}
              className={classes.pagination}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProductGrid;
