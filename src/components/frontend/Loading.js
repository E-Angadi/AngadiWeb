import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

function Loading() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignContent="center"
    >
      <Grid item xs="auto">
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Loading;
