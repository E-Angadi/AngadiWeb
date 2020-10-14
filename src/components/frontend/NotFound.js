import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
  },
  error: {
    color: theme.palette.error.main,
    margin: theme.spacing(1),
    display: "inline-block",
  },
}));
function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <h2 className={classes.heading}>
            <span className={classes.error}>Error 404</span>
            <br /> Page Not Found!
          </h2>
          <img src="/imgs/404error.svg" alt="Page Not Found" />
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFound;
