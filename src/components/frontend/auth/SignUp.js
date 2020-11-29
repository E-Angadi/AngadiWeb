import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { signUp } from "../../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    minHeight: "100vh",
  },
  grid: {
    height: "100%",
  },
  siginRoot: {
    backgroundColor: "#ffffff",
    width: 350,
    [theme.breakpoints.down("xs")]: {
      width: 340,
    },
    borderRadius: theme.shape.borderRadius,
    border: "1px #ddd solid",
  },
  imageDiv: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
  logo: {
    width: 155,
    height: "auto",
    display: "block",
  },
  divider: {
    margin: theme.spacing(1),
    marginTop: 0,
  },
  head: {
    display: "flex",
    padding: theme.spacing(1),
    paddingTop: 0,
    fontSize: 20,
    fontWeight: 700,
    justifyContent: "center",
  },
  form: {
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
  btn: {
    width: "97%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    backgroundImage:
      "linear-gradient(to right bottom, #ff9b00, #e78a07, #cf790b, #b7690d, #9f590d)",
  },
}));

const initialFValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  main: "",
  pincode: "",
  phoneNum: "",
};

const picodeSelect = [{ id: 0, title: "None" }];

function SignUp(props) {
  const classes = useStyles();
  const [dOpen, setDOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (values.password !== values.confirmPassword) {
        handleClickOpen();
        return;
      }
      var locations = props.locations[0].locations.split(",");
      var pincode = locations[values.pincode - 1];
      // console.log(locations);
      // console.log(pincode);
      props.signUp({
        ...values,
        pincode: pincode,
      });
    }
  };

  const handleClickOpen = () => {
    setDOpen(true);
  };

  const handleClose = () => {
    setDOpen(false);
  };

  const getPincodes = () => {
    if (props.locations) {
      var locations = props.locations[0].locations.split(",");
      var res = [{ id: 0, title: "None" }];
      locations.forEach((location, idx) => {
        res.push({ id: idx + 1, title: location });
      });
      return res;
    } else {
      return picodeSelect;
    }
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("email" in fieldValues)
      tmp.email = fieldValues.email ? "" : "Email field is required.";
    if ("password" in fieldValues)
      tmp.password =
        fieldValues.password && fieldValues.password.length > 6
          ? ""
          : "Password field is required and length greater than 6.";
    if ("username" in fieldValues)
      tmp.username = fieldValues.username ? "" : "Username field is required.";
    if ("confirmPassword" in fieldValues)
      tmp.confirmPassword = fieldValues.confirmPassword
        ? ""
        : "This field is required or check password again.";
    if ("main" in fieldValues)
      tmp.main = fieldValues.main ? "" : "Address is required.";
    if ("pincode" in fieldValues)
      tmp.pincode = fieldValues.pincode
        ? ""
        : "We can't deliver to your area if your pincode is not in the list.";
    if ("phoneNum" in fieldValues)
      tmp.phoneNum = fieldValues.phoneNum ? "" : "Phone Number is required.";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  if (props.auth.uid) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center">
        <Grid item>
          <div className={classes.siginRoot}>
            <div className={classes.imageDiv}>
              <img
                className={classes.logo}
                src="/imgs/logo1.png"
                alt="suryakantham sahajahara"
              />
            </div>
            <Divider className={classes.divider} />
            <div className={classes.head}>Sign Up</div>
            <Form onSubmit={handleSubmit}>
              <div className={classes.form}>
                <Controls.Input
                  name="username"
                  label="Your Name"
                  value={values.username}
                  onChange={handleInputChange}
                  error={errors.username}
                  className={classes.input}
                />
                <Controls.Input
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  className={classes.input}
                />
                <Controls.Input
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  className={classes.input}
                />
                <Controls.Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.password}
                  className={classes.input}
                />
                <Controls.InputArea
                  name="main"
                  label="Delivery Address"
                  value={values.main}
                  onChange={handleInputChange}
                  error={errors.main}
                  rowsMax={5}
                />
                <Controls.Select
                  name="pincode"
                  label="Pincode"
                  value={values.pincode}
                  onChange={handleInputChange}
                  options={getPincodes()}
                  error={errors.pincode}
                />
                <Controls.Input
                  name="phoneNum"
                  type="tel"
                  label="Phone Number"
                  value={values.phoneNum}
                  onChange={handleInputChange}
                  error={errors.phoneNum}
                />
                <Controls.Button
                  type="submit"
                  text="Sign Up"
                  className={classes.btn}
                />
              </div>
            </Form>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={dOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please check your password fields
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Controls.Button
            className={classes.btn}
            text="Cancel"
            type="cancel"
            onClick={handleClose}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    locations: state.firestore.ordered.locations,
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([{ collection: "locations" }])
)(SignUp);
