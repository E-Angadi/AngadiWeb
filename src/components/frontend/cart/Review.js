import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ProductCard from "../product/ProductHCard";
import PaymentDetails from "./PaymentDetails";
import CheckoutStepper from "./CheckoutStepper";
import { Link } from "react-router-dom";
import AddressForm from "./AddressForm";

import { connect } from "react-redux";
import { loadCartItems } from "../../../store/actions/cartActions";

import { Redirect } from "react-router-dom";

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
    marginBottom: theme.spacing(2),
  },
  rootAddress: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
  },
}));

function Review(props) {
  const classes = useStyles();
  const [proceed, setProceed] = useState(false);

  const proceedPayment = (cart, profile) => {
    return (
      cart.length > 0 &&
      profile.delivery !== "" &&
      profile.pincode !== "" &&
      profile.pNum !== ""
    );
  };

  useEffect(() => {
    setProceed(proceedPayment(props.cart, props.profile));
  }, [props.profile, props.cart]);

  if (!props.auth.uid) return <Redirect to="/signin" />;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <span className={classes.cartTitle}>Select Delivery Address </span>
          <AddressForm profile={props.profile} />
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
            <Button
              component={Link}
              to="/checkout/payment"
              className={classes.btn}
              variant="contained"
              color="primary"
              disabled={!proceed}
            >
              Make Payment
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <span className={classes.cartTitle}>
            My Cart({props.cart.length})
          </span>
          <div className={classes.root1}>
            {props.cart &&
              props.cart.map((item, idx) => (
                <ProductCard key={idx} item={item} />
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartItems: (items) => dispatch(loadCartItems(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
