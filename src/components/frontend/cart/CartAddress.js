import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Drawer } from "@material-ui/core";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";
import Form from "../../common/Form";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { updateUserInfo } from "../../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
  },
  btn: {
    width: 200,
    textTransform: "none",
    fontWeight: 600,
    margin: theme.spacing(1),
    marginTop: 0,
  },
  addressDiv: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ccc",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  addressHead: {
    fontSize: 18,
    fontWeight: 600,
    display: "block",
    marginBottom: theme.spacing(1),
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
  drawer: {
    width: 280,
  },
  infoErr: {
    color: "red",
  },
}));

const picodeSelect = [{ id: 0, title: "None" }];

const initialFValues = {
  main: "",
  pincode: "",
  phoneNum: "",
};

function CartAddress(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const proceedPayment = (profile) => {
    return (
      profile.delivery !== "" && profile.pincode !== "" && profile.pNum !== ""
    );
  };

  useEffect(() => {
    setValues({
      main: props.profile.delivery ? props.profile.delivery : "",
      pincode: props.profile.pincode
        ? getPincodeIndex(props.profile.pincode)
        : "",
      phoneNum: props.profile.pNum ? props.profile.pNum : "",
    });
  }, [props.profile]);

  const getPincodeIndex = (pincode) => {
    if (props.locations) {
      var locations = props.locations[0].locations.split(",");
      var idx = locations.findIndex((e) => e === pincode);
      return idx + 1;
    } else return 0;
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
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      var locations = props.locations[0].locations.split(",");
      var pincode = locations[values.pincode - 1];
      props.updateUserInfo(props.auth.uid, {
        ...values,
        pincode: pincode,
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12}>
          <div className={classes.addressDiv}>
            <span className={classes.addressHead}>
              {" "}
              {props.profile.name ? props.profile.name : ""}{" "}
            </span>
            <span className={classes.addressContent}>
              {props.profile.delivery ? props.profile.delivery : ""}
              <span className={classes.noWrap}>
                {props.profile.pincode ? "-" + props.profile.pincode : ""}
              </span>{" "}
              <br />
              <span className={classes.noWrap}>
                {props.profile.pNum ? "91 + " + props.profile.pNum : ""}
              </span>
            </span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={toggleDrawer}
            className={classes.btn}
            variant="contained"
            color="primary"
          >
            Add / Change Address
          </Button>
        </Grid>
        {!proceedPayment(props.profile) && (
          <Grid item xs={12} container justify="center">
            <Grid item xs="auto">
              <p className={classes.infoErr}>
                Fill all contact info proceed further..
              </p>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <div className={classes.drawer}>
          <Form onSubmit={handleSubmit}>
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
            <Controls.Button type="submit" text="Submit" />
          </Form>
        </div>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    locations: state.firestore.ordered.locations,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    cart: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (id, userinfo) => dispatch(updateUserInfo(id, userinfo)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "locations" }])
)(CartAddress);
