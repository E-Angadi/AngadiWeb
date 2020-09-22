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

function OrderDetails({ order }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.metadata}>
        <Grid container>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Order Id:</b> {order.orderId}
                </Typography>
                <Typography component="p">
                  <b>Transaction Id:</b> {order.transactionId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Date:</b> {order.date}
                </Typography>
                <Typography component="p">
                  <b>Time:</b> {order.time}
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
                  <b>Customer Name: </b> {order.customerName}
                </Typography>
                <Typography component="p">
                  <b>Phone Number: </b> {order.phoneNum}
                </Typography>
                <Typography component="p">
                  <b>Locality: </b> {order.locality}
                </Typography>
                <Typography component="p">
                  <b>Address: </b> {order.address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item container justify="center">
              <Grid item>
                <Typography component="p">
                  <b>Item Count: </b> {order.itemsCount}
                </Typography>
                <Typography component="p">
                  <b>Total Price: </b> {order.netPrice}
                </Typography>
                <Typography component="p">
                  <b>Payment Type: </b> {order.paymentType}
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
                <Tooltip title="Done Order">
                  <IconButton aria-label="done" className={classes.orderBtns}>
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
                  <IconButton aria-label="cancel" className={classes.orderBtns}>
                    <Clear />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {order.products &&
        order.products.map((product) => (
          <ProductSummary key={product.productId} product={product} />
        ))}
    </div>
  );
}

export default OrderDetails;
