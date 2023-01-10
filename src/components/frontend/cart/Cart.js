import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ProductCard from "../product/ProductHCard";
import PaymentDetails from "./PaymentDetails";
import CheckoutStepper from "./CheckoutStepper";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loadCartItems } from "../../../store/actions/cartActions";
import ScrollToTop from "../../common/ScrollToTop";

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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  noItemsContainer: {
    marginTop: 30,
    textAlign: "center",
    textColor: theme.palette.primary.main,
  },
  noItemsText: {
    textAlign: "center",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  noItemsTextHeading: {
    fontWeight: 700,
    textAlign: "center",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

function Cart(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.cart.length === 0) props.loadCartItems();
  }, []);

  useEffect(() => {
    if (props.cart.length === 0) props.loadCartItems();
  }, [props.auth]);

  return (
    <div className={classes.root}>
      <ScrollToTop />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {props.cart.length > 0 ? 
            <>
              <span className={classes.cartTitle}>
                My Cart({props.cart.length})
              </span>
              <div className={classes.root1}>
                {props.cart &&
                  props.cart.map((item, idx) => (
                    <ProductCard key={idx} item={item} />
                  ))}
              </div>
            </>
            :
            <>
            <Grid
              container
              justify="center"
              className={classes.noItemsContainer}
            >
              <Grid item xs="auto">
                <div className={classes.noItemsTextHeading}>
                  oops cart is empty
                </div>
                <div className={classes.noItemsText}>
                  Explore the wide range of our products and have them
                  delivered to your doorstep
                </div>
                <Button
                  component={Link}
                  className={classes.btn}
                  to="/deals"
                  variant="outlined"
                  color="primary"
                  alignItems="center"
                >
                  Explore Our Products
                </Button>
              </Grid>
            </Grid>
          </>
          }
        </Grid>
        <Grid item xs={12} lg={4}>
          <CheckoutStepper activeStep={0} />
          <PaymentDetails />
          <div className={classes.proceedBtn}>
            <Button
              component={Link}
              to="/checkout/review"
              className={classes.btn}
              variant="contained"
              color="primary"
              disabled={props.cart.length <= 0}
            >
              Place Order
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartItems: (items) => dispatch(loadCartItems(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
