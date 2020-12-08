import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
        <img height={200} src="/imgs/loading.gif" />
      </Grid>
    </Grid>
  );
}

export default Loading;
