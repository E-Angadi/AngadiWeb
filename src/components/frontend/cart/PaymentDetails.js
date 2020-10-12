import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: 20,
    fontWeight: 600,
    display: "block",
  },
  priceDiv: {
    fontSize: 14,
    height: 14,
    fontWeight: 550,
  },
  priceHead: {
    color: "rgba(0,0,0,.6);",
    float: "left",
  },
  price: {
    color: "#000000",
    float: "right",
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tPriceDiv: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
    height: 18,
  },
  tPriceHead: {
    float: "left",
  },
  tPrice: {
    float: "right",
  },
  save: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    textAlign: "right",
    fontSize: 14,
    color: theme.palette.success.main,
    fontWeight: 660,
  },
}));

function PaymentDetails() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.title}>Payment Details</span>

      <div className={classes.priceDiv}>
        <label className={classes.priceHead}>Actual Price</label>
        <span className={classes.price}>₹114.00</span>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.priceDiv}>
        <label className={classes.priceHead}>Discount</label>
        <span className={classes.price}>-₹25.00</span>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.tPriceDiv}>
        <label className={classes.tPriceHead}>Total Amount</label>
        <span className={classes.tPrice}>₹89.00</span>
      </div>
      <div className={classes.save}>You Save ₹25.00</div>
    </div>
  );
}

export default PaymentDetails;
