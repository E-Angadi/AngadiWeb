import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

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
    height: "52px",
    display: "inline-block",
    fontSize: "1.2rem",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    overflow: "hidden",
    color: "#000000",
  },
}));

// TODO: Truckate large category names

function CategoryHomePaper({ title, url, categoryId }) {
  const [imgLoaded, setLoaded] = useState(false);
  const classes = useStyles();
  return (
    <Link to={"/category/" + categoryId}>
      <Paper elevation={0} className={classes.paperRoot}>
        {!imgLoaded && (
          <Skeleton animation="wave" variant="rect" width="100%" height={150} />
        )}
        <img
          className={classes.paperImg}
          src={url}
          alt={title}
          onLoad={() => setLoaded(true)}
        />
        <span className={classes.paperTitle}>{title}</span>
      </Paper>
    </Link>
  );
}

export default CategoryHomePaper;
