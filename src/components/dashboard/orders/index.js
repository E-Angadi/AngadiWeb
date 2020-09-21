import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OrderInfoPaper from "./OrderInfoPaper";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function Orders() {
  const classes = useStyles();
  return (
    <div className={classes.divAlign}>
      <Typography variant="h5" className={classes.heading} color="primary">
        Orders
      </Typography>
      <Grid container justify="space-between" spacing={3}>
        <Grid item sm={2} />
        <Grid item xs={12} sm={4}>
          <OrderInfoPaper value={13} title={"New Orders"} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <OrderInfoPaper value={50} title={"Orders Processed"} />
        </Grid>
        <Grid item xs={1} sm={2} />
      </Grid>
    </div>
  );
}

export default Orders;
