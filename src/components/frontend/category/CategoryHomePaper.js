import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    width: 170,
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
    fontWeight: 400,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    border: "1px solid rgba(111,114,132,.25)",
  },
  paperImg: {
    width: 170,
  },
  paperTitle: {
    height: "50px",
    display: "inline-block",
    fontSize: "1.2rem",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    overflow: "hidden",
  },
}));

// TODO: Truckate large category names

function CategoryHomePaper({ title, url, categoryId }) {
  const classes = useStyles();
  return (
    <Link to={"/category/" + categoryId}>
      <Paper elevation={0} className={classes.paperRoot}>
        <img className={classes.paperImg} src={url} alt={title} />
        <span className={classes.paperTitle}>{title}</span>
      </Paper>
    </Link>
  );
}

export default CategoryHomePaper;
