import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import PincodeDialog from "./PincodeDialog";

const useStyles = makeStyles((theme) => ({
  catBarRoot: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: "2px",
    paddingBottom: "2px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: "0px",
      paddingBottom: "0px",
      height: "36px",
    },
  },
  catDelivery: {
    background: "url(/imgs/location-on.svg) left center no-repeat",
    backgroundSize: "24px",
    padding: " 0 10px 0 30px",
    height: "auto",
    color: theme.palette.primary.main,
    fontSize: "12px",
    cursor: "pointer",
  },
  pincode: {
    display: "block",
    fontWeight: 600,
    fontSize: "14px",
    [theme.breakpoints.down("xs")]: {
      display: "inline",
    },
  },
  category: {
    fontWeight: 600,
    fontSize: "14px",
    paddingLeft: "18px",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

// TODO: hook actual category with link to category view

const categories = [
  "Floors",
  "Natural Oils",
  "Pulses",
  "Aayurvedic",
  "Millets",
  "Floors",
  "Natural Oils",
  "Pulses",
  "Aayurvedic",
];
const catLimit = 8;

function CategoryBar() {
  const classes = useStyles();
  return (
    <div className={classes.catBarRoot}>
      <PincodeDialog />
      <Hidden xsDown>
        {categories.map((category, idx) => {
          if (idx < catLimit) {
            return (
              <Link key={idx} className={classes.category} to="/">
                {category}
              </Link>
            );
          } else {
            return <div />;
          }
        })}
        {categories.length > catLimit && (
          <Link className={classes.category} to="/">
            Others
          </Link>
        )}
      </Hidden>
    </div>
  );
}

export default CategoryBar;
