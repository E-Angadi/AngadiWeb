import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Breadcrumbs, Link, Hidden } from "@material-ui/core";
import CategoryPaper from "./CategoryPaper";
import RouterLink from "react-router-dom/Link";

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

const categories = [
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/11/thumb/0-11.png",
    title: "Snacks and Branded Food",
  },
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/11/thumb/0-11.png",
    title: "Snacks and Branded Food",
  },
  {
    url: "https://www.jiomart.com/images/category/6/thumb/0-6.png",
    title: "Personal Care",
  },
  {
    url: "https://www.jiomart.com/images/category/11/thumb/0-11.png",
    title: "Snacks and Branded Food",
  },
];

function AllCategories() {
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
          {categories.map(({ title, url }, idx) => (
            <Grid key={idx} xs={6} sm={4} lg={3} xl={2} item>
              <CategoryPaper title={title} url={url} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default AllCategories;
