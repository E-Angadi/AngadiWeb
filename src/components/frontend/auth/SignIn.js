import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, Button } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { signIn, anonymousSignup } from "../../../store/actions/authActions";
import { configs } from "../../../config/configs";

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
    fontWeight: "bold",
    backgroundImage:
      "linear-gradient(to right bottom, #ff9b00, #e78a07, #cf790b, #b7690d, #9f590d)",
  },
  signup: {
    color: theme.palette.error.main,
    fontWeight: 700,
    paddingLeft: theme.spacing(1),
  },
  signupDiv: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  guestBtn: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const initialFValues = {
  email: "",
  password: "",
};

function SignIn(props) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.signIn(values);
    }
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("email" in fieldValues)
      tmp.email = fieldValues.email ? "" : "This field is required.";
    if ("password" in fieldValues)
      tmp.password = fieldValues.password ? "" : "This field is required.";
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

  const handleGuest = () => {
    console.log("Hello World");
    props.anonymousSignup();
  };

  if (props.auth.uid) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center">
        <Grid item>
          <div className={classes.siginRoot}>
            <div className={classes.imageDiv}>
              <img
                className={classes.logo}
                src="/imgs/logo.png"
                alt={configs.title}
              />
            </div>
            <Divider className={classes.divider} />
            <div className={classes.head}>Sign In</div>
            <Form onSubmit={handleSubmit}>
              <div className={classes.form}>
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
                <Controls.Button
                  type="submit"
                  text="Sign In"
                  className={classes.btn}
                />
              </div>
            </Form>

            <div className={classes.signupDiv}>
              If you are not registered yet?
              <Link to="/signup" className={classes.signup}>
                Sign Up
              </Link>
            </div>
          </div>
          <Button
            className={classes.guestBtn}
            variant="outlined"
            color="primary"
            onClick={handleGuest}
          >
            continue as Guest
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    anonymousSignup: () => dispatch(anonymousSignup()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SignIn);
