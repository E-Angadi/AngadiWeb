import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  DialogActions,
  Button,
  TextField,
  Divider,
  Drawer,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  openCheckDialog,
  closeCheckDialog,
} from "../../../store/actions/locationActions";

const useStyles = makeStyles((theme) => ({
  catDelivery: {
    background: "url(/imgs/location-on.svg) left center no-repeat",
    backgroundSize: "24px",
    padding: " 0 10px 0 30px",
    height: "auto",
    color: theme.palette.primary.main,
    fontSize: "12px",
    cursor: "pointer",
  },
  pincode: {
    display: "block",
    fontWeight: 600,
    fontSize: "14px",
    [theme.breakpoints.down("xs")]: {
      display: "inline",
    },
  },
  or: {
    marginTop: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  centerDiv: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: theme.palette.primary.main,
  },
  contentText: {
    color: theme.palette.primary.light,
  },
  signIn: {
    textTransform: "none",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  titlesm: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontSize: "1rem",
    fontWeight: "600",
    color: theme.palette.primary.main,
  },
  contentTextSm: {
    color: theme.palette.primary.light,
    fontSize: "0.8rem",
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  pincodeText: {
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      marginBottom: theme.spacing(1),
    },
  },
  actions: {
    padding: theme.spacing(1),
  },
}));

function SignInBtn({ handleSignIn }) {
  const classes = useStyles();
  return (
    <div className={classes.centerDiv}>
      <Button
        className={classes.signIn}
        onClick={handleSignIn}
        variant="contained"
        color="primary"
        component={Link}
        to="/signin"
      >
        Sign in to view address
      </Button>
    </div>
  );
}

function OrDivider() {
  const classes = useStyles();
  return (
    <Grid className={classes.or} container justify="space-around" spacing={1}>
      <Grid container item xs={3} sm={4} alignItems="center">
        <Grid item xs={12}>
          <Divider color="primary" />
        </Grid>
      </Grid>
      <Grid item>or check availability</Grid>
      <Grid container item xs={3} sm={4} alignItems="center">
        <Grid item xs={12}>
          <Divider color="primary" />
        </Grid>
      </Grid>
    </Grid>
  );
}

function PincodeDialog(props) {
  const classes = useStyles();
  const [pincode, setPincode] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleClickOpen = () => {
    props.openCheckDialog();
  };

  const handleClose = () => {
    props.closeCheckDialog();
  };

  const title = "Choose your location";
  const contentText =
    "Select a delivery location to see product availability and delivery options";

  const handlePincodeChange = (e) => {
    var text = e.target.value;
    if (text === "") setPincode("");
    else if (text.length < 7 && text > 0) {
      setPincode(text);
      setErr(false);
      setErrMsg("");
    }
  };

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      var locations = props.locations[0].locations.split(",");
      if (locations.includes(pincode)) {
        setErr(false);
        setErrMsg("Yeah!, we deliver to this location");
      } else {
        setErr(true);
        setErrMsg("Sorry :/, we don't deliver to this location");
      }
    } else {
      setErr(true);
      setErrMsg("Enter valid Pincode");
    }
  };

  return (
    <>
      <div className={classes.catDelivery} onClick={handleClickOpen}>
        <span>Delivery to </span>
        <span className={classes.pincode}>Select</span>
      </div>
      <Hidden xsDown>
        <Dialog
          open={props.open}
          onClose={handleClose}
          aria-labelledby="pincode-check-dialog"
        >
          <DialogTitle
            className={classes.title}
            id="pincode-check-dialog-title"
          >
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.contentText}>
              {props.auth.uid && !props.profile.isGuest
                ? "Our delivery service is available at your location"
                : contentText}
            </DialogContentText>

            {!props.auth.uid && (
              <>
                <SignInBtn handleSignIn={handleClose} />
                <OrDivider />
              </>
            )}

            {(!props.auth.uid || props.profile.isGuest) && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="pincode"
                  label="Pincode"
                  fullWidth
                  value={pincode}
                  error={err}
                  helperText={errMsg}
                  className={classes.pincodeText}
                  onChange={handlePincodeChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {(!props.auth.uid || props.profile.isGuest) && (
              <Button
                disabled={!props.locations}
                onClick={handlePincodeCheck}
                color="primary"
              >
                Check
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Hidden>
      <Hidden smUp>
        <Drawer anchor={"bottom"} open={props.open} onClose={handleClose}>
          <span className={classes.titlesm}> {title} </span>
          <span className={classes.contentTextSm}>
            {props.auth.uid
              ? "Our delivery service is available at your location"
              : contentText}{" "}
          </span>

          {!props.auth.uid && (
            <>
              <SignInBtn handleSignIn={handleClose} />
              <OrDivider />
            </>
          )}

          {(!props.auth.uid || props.profile.isGuest) && (
            <>
              <div className={classes.centerDiv}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="pincode"
                  label="Pincode"
                  value={pincode}
                  error={err}
                  helperText={errMsg}
                  className={classes.pincodeText}
                  onChange={handlePincodeChange}
                />
              </div>
            </>
          )}
          <div className={classes.actions}>
            <Grid container justify="flex-end" spacing={1}>
              <Grid item>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </Grid>
              {(!props.auth.uid || props.profile.isGuest) && (
                <Grid item>
                  <Button onClick={handlePincodeCheck} color="primary">
                    Check
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </Drawer>
      </Hidden>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    locations: state.firestore.ordered.locations,
    open: state.location.openCheck,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    openCheckDialog: () => dispatch(openCheckDialog()),
    closeCheckDialog: () => dispatch(closeCheckDialog()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([{ collection: "locations" }])
)(PincodeDialog);
