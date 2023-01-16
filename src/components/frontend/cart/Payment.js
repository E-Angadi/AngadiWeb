import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import CheckoutStepper from "./CheckoutStepper";

import { connect } from "react-redux";
import {
  createOrder,
  verifyOrder,
  resetPaymentState,
} from "../../../store/actions/paymentActions";
import { configs } from "../../../config/configs";
import { Link } from "react-router-dom";
import ScrollToTop from "../../common/ScrollToTop";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: "center",
  },
  confirmMsg: {
    textAlign: "center",
  },
  status: {
    textAlign: "center",
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

const modalStyle = {
  top: "30%",
  left: "calc(50% - 200px)",
  transform: "transulate(-50%, -50%)",
};

function Payment(props) {
  const classes = useStyles();
  const [cod, setCod] = useState(false);
  const [openM, setOpenM] = useState(false);
  const history = useHistory();

  const getbody = () => {
    var success = !props.status && props.msg === "SUCCESS";
    return (
      <div style={modalStyle} className={classes.paper}>
        <Grid container justify = "center">
          <Grid item xs={12}>
            <h2 className={classes.confirmMsg}>
              {success ? "Order Placed" : "Failure Placing Order"}
            </h2>
          </Grid>
          <Grid item>
            <img src={success ? "/imgs/success.png" : "/imgs/failure.png"} />
          </Grid>
          {success && (
            <Grid item xs={12}>
              <div className={classes.status}>
                <Link to="/account#orders" onClick={handleClose}>
                  View your order details and status
                </Link>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    );
  };

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
      key: configs.razorpay.key_id,
      amount: calcTPrice(props.cart) * 100,
      currency: "INR",
      name: configs.title,
      description: configs.description,
      order_id: props.order_id,
      handler: (res) => {
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
        color: configs.secondary,
      },
      modal: {
        ondismiss: () => {
          props.resetPaymentState();
        },
      },
    };
    if (props.order_id !== "" && props.status) {
      var rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response) {
        console.log("Payment not successful due to -" + response.error.reason);
        handleOpen();
        props.resetPaymentState();
      });
    }
  }, [props.order_id]);

  useEffect(() => {
    if (!props.status && props.msg !== "") {
      if (props.msg === "SUCCESS") {
        console.log("Payment successful");
      } else {
        console.log("Payment not successful due to -" + props.msg);
      }
      handleOpen();
    }
  }, [props.status]);

  if (!props.auth.uid) return <Redirect to="/signin" />;

  const handleOpen = () => {
    setOpenM(true);
  };

  const handleClose = () => {
    setOpenM(false);
    if (!props.status && props.msg === "SUCCESS") {
      history.push("/account#orders");
      props.resetPaymentState();
    } 
  };
  
  const product = {
    description : configs.description,
    price:calcTPrice(props.cart) * 100
  };

  return (
    <div className={classes.root}>
      <ScrollToTop />
      <Grid container justify="center">
        <Grid item xs={12} lg={4}>
          <CheckoutStepper activeStep={2} />
          <PaymentDetails />

{/*--------------------PayPal CheckOut Button For payment--------------------*/}

          <div className="paypal">
            <p className="checkout-title">PAY WITH PAYPAL</p>
            <div className="paypal-button-container">

              <PaypalCheckoutButton product ={ product }/>

            </div>
         </div>


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
            disabled={props.status}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={openM}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {getbody()}
      </Modal>
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
    msg: state.payment.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (cod) => dispatch(createOrder(cod)),
    resetPaymentState: () => dispatch(resetPaymentState()),
    verifyOrder: (razorpay_signature, razorpay_order_id, razorpay_payment_id) =>
      dispatch(
        verifyOrder(razorpay_signature, razorpay_order_id, razorpay_payment_id)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
