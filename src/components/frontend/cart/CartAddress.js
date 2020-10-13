import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Drawer } from "@material-ui/core";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";
import Form from "../../common/Form";

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
    margin: theme.spacing(2),
    padding: theme.spacing(3),
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
}));

const initialFValues = {
  main: "",
  pincode: "",
  phoneNum: "",
};

const picodeSelect = [
  { id: 0, title: "None" },
  { id: 1, title: "500091" },
  { id: 2, title: "500092" },
  { id: 3, title: "500093" },
  { id: 4, title: "500094" },
];

function CartAddress() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
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
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
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
            <span className={classes.addressHead}>T Bharath Chandra</span>
            <span className={classes.addressContent}>
              202, kalyan residency, venkata sai enclave, nizampet, Eshwar
              villas road, Hyderabad, Telangana.
              <span className={classes.noWrap}>500090</span>
              <span className={classes.noWrap}>+91 - 7981415977</span>
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
              options={picodeSelect}
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

export default CartAddress;
