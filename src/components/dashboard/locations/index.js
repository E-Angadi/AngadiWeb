import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../common/PageHeader";
import { LocationOn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spacing: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function Locations() {
  const classes = useStyles();
  return (
    <div className={classes.spacing}>
      <PageHeader
        title={"Manage Delivery Locations"}
        icon={<LocationOn fontSize="large" />}
        subTitle={"Add and remove delivery locations pincode"}
      />
    </div>
  );
}

export default Locations;
