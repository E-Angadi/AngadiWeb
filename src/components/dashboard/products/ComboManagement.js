import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from '@material-ui/core/Grid';
import PageHeader from "../common/PageHeader";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

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

function ComboManagement() {
  const classes = useStyles();
  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Combo and Offers Management"}
        icon={<LocalOfferIcon fontSize="large" />}
        subTitle={"Manage your offers and combo listings"}
      />
    </div>
  );
}

export default ComboManagement;
