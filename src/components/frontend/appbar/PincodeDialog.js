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

function PincodeDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const title = "Choose your location";
  const contentText =
    "Select a delivery location to see product availability and delivery options";

  return (
    <>
      <div className={classes.catDelivery} onClick={handleClickOpen}>
        <span>Delivery to </span>
        <span className={classes.pincode}> 500090</span>
      </div>
      <Hidden xsDown>
        <Dialog
          open={open}
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
              {contentText}
            </DialogContentText>

            <SignInBtn handleSignIn={handleClose} />

            <OrDivider />

            <TextField
              autoFocus
              margin="dense"
              id="pincode"
              label="Pincode"
              fullWidth
              error={false}
              helperText=""
              className={classes.pincodeText}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Check
            </Button>
          </DialogActions>
        </Dialog>
      </Hidden>
      <Hidden smUp>
        <Drawer anchor={"bottom"} open={open} onClose={handleClose}>
          <span className={classes.titlesm}> {title} </span>
          <span className={classes.contentTextSm}>{contentText} </span>
          <SignInBtn handleSignIn={handleClose} />
          <OrDivider />
          <div className={classes.centerDiv}>
            <TextField
              autoFocus
              margin="dense"
              id="pincode"
              label="Pincode"
              error={false}
              helperText=""
              className={classes.pincodeText}
            />
          </div>
          <div className={classes.actions}>
            <Grid container justify="flex-end" spacing={1}>
              <Grid item>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleClose} color="primary">
                  Check
                </Button>
              </Grid>
            </Grid>
          </div>
        </Drawer>
      </Hidden>
    </>
  );
}

export default PincodeDialog;
