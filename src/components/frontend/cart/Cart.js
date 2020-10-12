import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(1),
    minHeight: "100vh",
  },
}));

function Cart() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}

export default Cart;
