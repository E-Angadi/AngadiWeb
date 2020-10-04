import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  image: {
    width: "100%",
  },
}));

function CategoryGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={4} sm={3}>
          <Link to="/">
            <img
              className={classes.image}
              src="/imgs/default.jpg"
              alt="category"
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CategoryGrid;
