import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 400,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
    border: "1px solid rgba(111,114,132,.25)",
  },
  paperImg: {
    width: "100%",
  },
  paperTitle: {
    height: "50px",
    display: "inline-block",
    fontSize: "1.2rem",
    fontWeight: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    overflow: "hidden",
  },
}));

// TODO: Truckate large category names

function CategoryPaper({ title, url }) {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paperRoot}>
      <img className={classes.paperImg} src={url} alt={title} />
      <span className={classes.paperTitle}>{title}</span>
    </Paper>
  );
}

export default CategoryPaper;
