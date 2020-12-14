import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { updateUserInfo } from "../../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const picodeSelect = [{ id: 0, title: "None" }];

const initialFValues = {
  name: "",
  main: "",
  pincode: 0,
  phoneNum: "",
};

function AddressForm(props) {
  const classes = useStyles();

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

  const checkChange = (profile, values) => {
    var pincodes = getPincodes();
    if (pincodes.length < 1) return false;
    return (
      profile.name === values.name &&
      profile.delivery === values.main &&
      profile.pincode === pincodes[values.pincode].title &&
      profile.pNum === values.phoneNum
    );
  };

  const resetValues = () => {
    setValues({
      name: props.profile.name ? props.profile.name : "",
      main: props.profile.delivery ? props.profile.delivery : "",
      pincode: props.profile.pincode
        ? getPincodeIndex(props.profile.pincode)
        : "",
      phoneNum: props.profile.pNum ? props.profile.pNum : "",
    });
  };

  useEffect(() => {
    setValues({
      name: props.profile.name ? props.profile.name : "",
      main: props.profile.delivery ? props.profile.delivery : "",
      pincode: props.profile.pincode
        ? getPincodeIndex(props.profile.pincode)
        : 0,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      var locations = props.locations[0].locations.split(",");
      var pincode = locations[values.pincode - 1];
      props.updateUserInfo(props.auth.uid, {
        ...values,
        pincode: pincode,
      });
    }
  };

  return (
    <div className={classes.root}>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              name="phoneNum"
              type="tel"
              label="Phone Number"
              value={values.phoneNum}
              onChange={handleInputChange}
              error={errors.phoneNum}
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Controls.Button
              disabled={checkChange(props.profile, values)}
              onClick={resetValues}
              type="reset"
              text="Reset"
            />
            <Controls.Button
              disabled={checkChange(props.profile, values)}
              type="submit"
              text="Submit"
            />
          </Grid>
        </Grid>
      </Form>
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
)(AddressForm);
