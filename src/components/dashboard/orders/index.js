import React from "react";
import PageHeader from "../common/PageHeader";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OrderInfoPaper from "./OrderInfoPaper";
import ReceiptIcon from "@material-ui/icons/Receipt";

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
    paddingBottom: "10px",
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
      <PageHeader
        title={"Manage Orders"}
        icon={<ReceiptIcon fontSize="large" />}
        subTitle={"View and update order status"}
      />
      <Grid container justify="center">
        <Grid item xs={10} sm={4}>
          <OrderInfoPaper value={13} title={"Pending Orders"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;
