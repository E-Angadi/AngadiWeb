import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

import { connect } from "react-redux";

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

const calcAPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.taxedPrice;
  });
  return res;
};

const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.totalPrice;
  });
  return res;
};

function PaymentDetails(props) {
  const classes = useStyles();
  const [aPrice, setAPrice] = useState(0);
  const [tPrice, setTPrice] = useState(0);

  useEffect(() => {
    setAPrice(calcAPrice(props.cart));
    setTPrice(calcTPrice(props.cart));
  }, [props.cart]);

  return (
    <div className={classes.root}>
      <span className={classes.title}>Payment Details</span>

      <div className={classes.priceDiv}>
        <label className={classes.priceHead}>Actual Price</label>
        <span className={classes.price}>₹ {aPrice}</span>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.priceDiv}>
        <label className={classes.priceHead}>Discount</label>
        <span className={classes.price}>-₹ {aPrice - tPrice} </span>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.tPriceDiv}>
        <label className={classes.tPriceHead}>Total Amount</label>
        <span className={classes.tPrice}>₹ {tPrice}</span>
      </div>
      <div className={classes.save}>You Save ₹ {aPrice - tPrice}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
  };
};

export default connect(mapStateToProps, null)(PaymentDetails);
