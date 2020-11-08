import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Breadcrumbs, Link, Hidden } from "@material-ui/core";
import CategoryPaper from "./CategoryPaper";
import RouterLink from "react-router-dom/Link";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    minHeight: "100vh",
  },
  divRoot: {
    width: "81%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: 18,
    [theme.breakpoints.up("lg")]: {
      fontSize: 24,
    },
    fontWeight: "bold",
    padding: theme.spacing(2),
  },
}));

function AllCategories(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.divRoot}>
        <Hidden xsDown>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="primary" href="/" component={RouterLink} to="/">
              Home
            </Link>
            <Link
              color="textPrimary"
              href="/categories"
              component={RouterLink}
              to="/categories"
              aria-current="page"
            >
              Categories
            </Link>
          </Breadcrumbs>
        </Hidden>
        <div className={classes.title}>Our Categories</div>
        <Grid container spacing={1}>
          {props.categories &&
            props.categories.map((category) => (
              <Grid key={category.id} xs={6} sm={4} lg={3} xl={2} item>
                <CategoryPaper
                  categoryId={category.id}
                  title={category.title}
                  url={category.imageURL}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "categories" }])
)(AllCategories);
