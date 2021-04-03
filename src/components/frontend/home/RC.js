import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Refunds from "../Refunds";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingBottom: theme.spacing(2),
    minHeight: "100vh",
  },
  base: {
    width: "100%",
    marginTop: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    color: "000000",
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    marginBottom: theme.spacing(1),
    fontWeight: 700,
  },
}));

function RC() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={11} sm={8}>
          <div className={classes.base}>
            <div className={classes.title}>Refunds/Cancellation</div>
            <Refunds />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default RC;
