import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import CheckoutStepper from "./CheckoutStepper";

import { connect } from "react-redux";
import {
  createOrder,
  verifyOrder,
} from "../../../store/actions/paymentActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    minHeight: "100vh",
  },
  paymentType: {
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    marginTop: theme.spacing(1),
  },
  btn: {
    width: "100%",
    textTransform: "none",
    fontWeight: "bold",
    marginTop: theme.spacing(1),
    backgroundImage:
      "linear-gradient(to right bottom, #ff9b00, #e78a07, #cf790b, #b7690d, #9f590d)",
    padding: theme.spacing(1),
    fontSize: 18,
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

function Payment(props) {
  const classes = useStyles();
  const [cod, setCod] = useState(false);

  const handleCodChange = (e) => {
    e.preventDefault();
    setCod(!cod);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    props.createOrder(cod);
  };

  useEffect(() => {
    if (!props.auth.uid) {
      return;
    }
    var options = {
      key: "rzp_test_lxD9jsRSbpBOAz",
      amount: calcTPrice(props.cart) * 100,
      currency: "INR",
      name: "Suryakantham Sahajahaara",
      description: "Buy authentic Indian groceries and Ayurvedam products",
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
        name: props.profile.name,
        email: "",
        contact: props.profile.pNum,
      },
      theme: {
        color: "#E1F5FE",
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
      <Grid container justify="center">
        <Grid item xs={12} lg={4}>
          <CheckoutStepper activeStep={2} />
          <PaymentDetails />
          <div className={classes.paymentType}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      onChange={handleCodChange}
                      checked={cod}
                      name="cod"
                      color="primary"
                    />
                  }
                  label="Cash on delivery"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </div>
          <Button
            onClick={handlePayment}
            className={classes.btn}
            variant="contained"
          >
            Place Order
          </Button>
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
    createOrder: (cod) => dispatch(createOrder(cod)),
    verifyOrder: (razorpay_signature, razorpay_order_id, razorpay_payment_id) =>
      dispatch(
        verifyOrder(razorpay_signature, razorpay_order_id, razorpay_payment_id)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
