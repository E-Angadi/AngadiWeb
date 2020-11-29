import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import CartAddress from "../cart/CartAddress";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingTop: theme.spacing(3),
    minHeight: "100vh",
  },
  userImg: {
    width: 250,
    height: 250,
    paddingTop: 30,
  },
  logoutBtn: {
    textAlign: "center",
    marginTop: 10,
  },
}));

function Account(props) {
  const classes = useStyles();

  const handleLogout = () => {
    props.signOut();
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
          <Grid item xs={6}>
            <CartAddress profile={props.profile} open={false} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

const mapStatetoProps = (state) => {
  console.log(state.firebase.profile);
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Account);
