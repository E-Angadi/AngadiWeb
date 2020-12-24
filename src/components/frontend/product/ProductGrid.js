import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ProductCard from "../product/ProductCard";
import { configs } from "../../../config/configs";

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

function ProductGrid(props) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const pageLimit = configs.maxPageCards;
  const { data } = props;

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
          {sliceProducts(data, page, pageLimit).map((product) => {
            if (product.visibility) {
              return (
                <Grid key={product.id} item xs={6} sm={4} md={3} xl={2}>
                  <ProductCard
                    productData={product}
                    fullwidth={true}
                    titleLimit={50}
                  />
                </Grid>
              );
            }
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
