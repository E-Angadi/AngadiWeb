import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { ShoppingCart } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "280px",
    background: "#707070",
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      height: "200px",
    },
  },
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  iconFabStyles: {
    marginTop: "10px",
    color: theme.palette.secondary.main,
    "&:hover": {
      cursor: "context-menu",
    },
  },
  iconStyles: {
    color: "#707070",
  },
}));

function OrderInfoPaper(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container>
        <Grid item xs={12} spacing={0} container>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Typography
              variant="h2"
              className={classes.heading}
              color="secondary"
            >
              {" "}
              {props.value}{" "}
            </Typography>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={3}>
            <Fab className={classes.iconFabStyles}>
              {" "}
              <ShoppingCart className={classes.iconStyles} />{" "}
            </Fab>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: "20%" }} />
        </Grid>
        <Grid item xs={12} spacing={0} container>
          <Grid item xs={1} />
          <Grid item xs={9}>
            <Typography
              variant="h4"
              className={classes.heading}
              color="secondary"
            >
              {" "}
              {props.title}{" "}
            </Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OrderInfoPaper;
