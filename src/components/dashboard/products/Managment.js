import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from '@material-ui/core/Grid';
import StoreIcon from "@material-ui/icons/Store";
import PageHeader from "../common/PageHeader";

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
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function Management() {
  const classes = useStyles();
  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Product Management"}
        icon={<StoreIcon fontSize="large" />}
        subTitle={"Manage your entire store listing"}
      />
    </div>
  );
}

export default Management;
