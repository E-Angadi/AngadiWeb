import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ProductCard from "../product/ProductHCard";
import PaymentDetails from "./PaymentDetails";
import CheckoutStepper from "./CheckoutStepper";
import { Link } from "react-router-dom";
import CartAddress from "./CartAddress";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    minHeight: "100vh",
  },
  root1: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  root2: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  proceedBtn: {
    paddingTop: theme.spacing(1),
    display: "flex",
    justifyContent: "end",
    marginLeft: theme.spacing(1),
  },
  btn: {
    width: 200,
    textTransform: "none",
    fontWeight: 600,
    marginRight: theme.spacing(1),
  },
  rootAddress: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
  },
}));

function Review() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <span className={classes.cartTitle}>Select Delivery Address </span>
          <CartAddress />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CheckoutStepper activeStep={1} />
          <PaymentDetails />
          <div className={classes.proceedBtn}>
            <Button
              component={Link}
              to="/checkout/cart"
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Back
            </Button>
            <Button className={classes.btn} variant="contained" color="primary">
              Make Payment
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
          <span className={classes.cartTitle}>My Cart({1})</span>
          <div className={classes.root1}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Review;
