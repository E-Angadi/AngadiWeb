import React from "react";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from '@material-ui/core/Grid';
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
    backgroundColor: theme.palette.secondary.main,
    minHeight: "calc(100vh - 100px)",
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function Banners() {
  const classes = useStyles();
  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Manage Banners"}
        icon={<ViewCarousel fontSize="large" />}
        subTitle={"Add and update display banners"}
      />
    </div>
  );
}

export default Banners;
