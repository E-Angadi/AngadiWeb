import React from "react";
import { Paper, Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  productDiv: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginBottom: "0px",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));

function ProductSummary({ product }) {
  const classes = useStyles();
  return (
    <Paper className={classes.productDiv}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Typography variant="h6">
            <b>
              {product.title} ({product.variant})
            </b>
          </Typography>
          <Typography component="p">
            {" "}
            quantity: <b>{product.quantity}</b>{" "}
          </Typography>
        </Grid>
        <Grid item xs={2} justify="flex-end">
          <Typography component="p">
            {" "}
            Price: <b>₹ {product.price}</b>{" "}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductSummary;
