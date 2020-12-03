import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ProductCard from "../product/ProductHCard";
import PaymentDetails from "./PaymentDetails";
import CheckoutStepper from "./CheckoutStepper";
import { Link } from "react-router-dom";
import CartAddress from "./CartAddress";

import { connect } from "react-redux";
import { loadCartItems } from "../../../store/actions/cartActions";
import {
  createOrder,
  verifyOrder,
} from "../../../store/actions/paymentActions";

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
  },
  rootAddress: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
  },
}));

const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.totalPrice;
  });
  return res;
};

function Review(props) {
  const classes = useStyles();

  const handlePayment = (e) => {
    e.preventDefault();
    props.createOrder();
  };

  useEffect(() => {
    var options = {
      key: "rzp_test_lxD9jsRSbpBOAz",
      amount: calcTPrice(props.cart) * 100,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: props.order_id,
      handler: (res) => {
        console.log(res);
        props.verifyOrder(
          res.razorpay_signature,
          res.razorpay_order_id,
          res.razorpay_payment_id
        );
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };
    if (props.order_id !== "") {
      var rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response) {
        console.log(response.error);
      });
    }
  }, [props.order_id]);

  if (!props.auth.uid) return <Redirect to="/signin" />;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <span className={classes.cartTitle}>Select Delivery Address </span>
          <CartAddress profile={props.profile} open={true} />
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
              onClick={handlePayment}
              className={classes.btn}
              variant="contained"
              color="primary"
            >
              Make Payment
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
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
    order_id: state.payment.order_id,
    status: state.payment.status,
    err_msg: state.payment.err_msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartItems: (items) => dispatch(loadCartItems(items)),
    createOrder: () => dispatch(createOrder()),
    verifyOrder: (razorpay_signature, razorpay_order_id, razorpay_payment_id) =>
      dispatch(
        verifyOrder(razorpay_signature, razorpay_order_id, razorpay_payment_id)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
