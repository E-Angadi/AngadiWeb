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
  console.log(product);
  return (
    <Paper className={classes.productDiv}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <img src={product.imageData} width={"100%"} alt={product.title} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6">
            <b>{product.title}</b>
          </Typography>
          <Typography component="p">
            {" "}
            Price: <b>{product.price}</b>{" "}
          </Typography>
          <Typography component="p">
            {" "}
            Variant: <b>{product.varient}</b>{" "}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductSummary;
