import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import CartAddress from "../cart/CartAddress";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../../../store/actions/authActions";
import { cancelOrder } from "../../../store/actions/paymentActions";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import OrderCard from "./OrderCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingTop: theme.spacing(3),
    minHeight: "100vh",
  },
  userImg: {
    width: 150,
    height: 150,
    paddingTop: 30,
  },
  logoutBtn: {
    textAlign: "center",
    marginTop: 10,
  },
  ordersRoot: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
}));

function Account(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleLogout = () => {
    props.signOut();
    history.push("/");
  };

  if (!props.auth.uid) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs="auto">
          <img className={classes.userImg} src="/imgs/user.png" />
        </Grid>
        <Grid xs={12} item container justify="center">
          <Grid item xs={"auto"}>
            <Button
              onClick={handleLogout}
              variant="outlined"
              className={classes.logoutBtn}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12} item container justify="center">
          <Grid item xs={10} lg={6}>
            <CartAddress profile={props.profile} open={false} />
          </Grid>
          <Grid id="orders" item xs={10} lg={8}>
            <div className={classes.ordersRoot}>
              <h2>Orders</h2>
              {props.orders &&
                props.orders.map((order, idx) => (
                  <OrderCard
                    key={idx}
                    cancelOrder={(id) => props.cancelOrder(id)}
                    order={order}
                  />
                ))}
              {props.orders && props.orders.length === 0 && (
                <p>No Previous Orders</p>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    cancelOrder: (id) => dispatch(cancelOrder(id)),
  };
};

const mapStatetoProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    orders: state.firestore.ordered.orders,
  };
};

export default compose(
  connect(mapStatetoProps, mapDispatchtoProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "orders",
        where: [
          ["user_id", "==", props.auth.uid],
          ["completed", "==", true],
        ],
      },
    ];
  })
)(Account);
