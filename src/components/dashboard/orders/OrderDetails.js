import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Done, Clear } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import ProductSummary from "./ProductSummary";

import {
  cancelOrder,
  deliveredOrder,
} from "../../../store/actions/paymentActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginBottom: "10px",
    },
    paddingBottom: "10px",
  },
  metadata: {
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  divider: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  orderBtns: {
    color: theme.palette.primary.dark,
    marginButton: theme.spacing(1),
  },
}));

const getItems = (cart) => {
  const items = [];
  if (!cart) return items;
  const citems = cart.split(",");
  citems.forEach((c) => {
    const sc = c.split(";");
    if (sc.length === 4)
      items.push({
        title: sc[0],
        quantity: parseInt(sc[1]),
        price: sc[2],
        variant: sc[3],
      });
  });
  return items;
};

const getItemsCount = (cart) => {
  return cart.split(",").length;
};

const getTime = (time) => {
  var date = new Date(time.toDate().toString());
  return date.toLocaleTimeString("en-IN");
};

const getDate = (time) => {
  var date = new Date(time.toDate().toString());
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

function OrderDetails(props) {
  const classes = useStyles();

  const handleCancel = () => {
    props.cancelOrder(props.order.id);
  };

  const handleDeliver = () => {
    props.deliveredOrder(props.order.id);
  };

  if (!props.order.time) {
    return <div className={classes.root}></div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.metadata}>
        <Grid container>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Order Id:</b> {props.order.id}
                </Typography>
                <Typography component="p">
                  <b>Payment Id:</b> {props.order.payment_id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Date:</b> {getDate(props.order.time)}
                </Typography>
                <Typography component="p">
                  <b>Time:</b> {getTime(props.order.time)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.metadata}>
        <Grid container>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Customer Name: </b> {props.order.user_name}
                </Typography>
                <Typography component="p">
                  <b>Phone Number: </b> {props.order.pnum}
                </Typography>
                <Typography component="p">
                  <b>Pincode: </b> {props.order.pincode}
                </Typography>
                <Typography component="p">
                  <b>Address: </b> {props.order.address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Item Count: </b> {getItemsCount(props.order.cart)}
                </Typography>
                <Typography component="p">
                  <b>Total Price: </b> {props.order.amount}
                </Typography>
                <Typography component="p">
                  <b>Payment Type: </b>{" "}
                  {props.order.cod ? "Cash On Delivery" : "Online Payment"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.metadate}>
        <Grid container>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Tooltip title="Delivered Order">
                  <IconButton
                    onClick={handleDeliver}
                    aria-label="delivered"
                    className={classes.orderBtns}
                  >
                    <Done />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Tooltip title="Cancel Order">
                  <IconButton
                    onClick={handleCancel}
                    aria-label="cancel"
                    className={classes.orderBtns}
                  >
                    <Clear />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {getItemsCount(props.order.cart) > 0 &&
        getItems(props.order.cart).map((product) => (
          <ProductSummary key={product.productId} product={product} />
        ))}
    </div>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    cancelOrder: (id) => dispatch(cancelOrder(id)),
    deliveredOrder: (id) => dispatch(deliveredOrder(id)),
  };
};

export default connect(null, mapDispatchtoProps)(OrderDetails);
