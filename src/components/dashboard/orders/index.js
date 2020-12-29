import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OrdersTable from "./OrdersTable";
import ReceiptIcon from "@material-ui/icons/Receipt";
import OrderDetails from "./OrderDetails";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function Orders(props) {
  const classes = useStyles();
  const [orderSelected, setOrderSelected] = useState({});

  const changeOrderSelected = (order) => {
    setOrderSelected(order);
  };

  useEffect(() => {
    if (props.orders && props.orders.length > 0) {
      setOrderSelected(props.orders[0]);
    }
  }, [props.orders]);

  useEffect(() => {
    console.log(orderSelected);
  }, [orderSelected]);

  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Manage Orders"}
        icon={<ReceiptIcon fontSize="large" />}
        subTitle={"View and update order status"}
      />
      {props.orders && props.orders.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <OrdersTable
              orders={props.orders}
              orderSelected={orderSelected}
              changeOrderSelected={changeOrderSelected}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderDetails order={orderSelected} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const mapStatetoProps = (state) => {
  console.log(state.firestore.ordered.orders);
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    orders: state.firestore.ordered.orders,
  };
};
export default compose(
  connect(mapStatetoProps, null),
  firestoreConnect((props) => {
    return [
      {
        collection: "orders",
        where: [
          ["completed", "==", true],
          ["deliverd", "==", false],
          ["cancelled", "==", false],
        ],
        orderBy: ["time", "desc"],
      },
    ];
  })
)(Orders);
