import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";

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

const picodeSelect = [
  { id: 0, title: "None" },
  { id: 1, title: "500091" },
  { id: 2, title: "500092" },
  { id: 3, title: "500093" },
  { id: 4, title: "500094" },
];

function SignUp() {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    }
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("email" in fieldValues)
      tmp.email = fieldValues.email ? "" : "This field is required.";
    if ("password" in fieldValues)
      tmp.password = fieldValues.password ? "" : "This field is required.";
    if ("username" in fieldValues)
      tmp.username = fieldValues.username ? "" : "This field is required.";
    if ("confirmPassword" in fieldValues)
      tmp.confirmPassword = fieldValues.confirmPassword
        ? ""
        : "This field is required.";
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
                  value={values.password}
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
    </div>
  );
}

export default SignUp;
