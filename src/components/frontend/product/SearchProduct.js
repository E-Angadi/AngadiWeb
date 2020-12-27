import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import ProductGrid from "./ProductGrid";

import { connect } from "react-redux";

import { search } from "../../../store/actions/searchActions";
import CartBox from "../cart/CartBox";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  main: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  searchHead: {
    boxSizing: "border-box",
    padding: theme.spacing(2),
    paddingLeft: 0,
    fontSize: 16,
    fontWeight: 400,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
}));

function SearchProduct(props) {
  const classes = useStyles();
  const search = props.match.params.searchParam;

  useEffect(() => {
    props.search(props.match.params.searchParam);
  }, [props.match.params.searchParam]);

  if (props.searching) {
    return <div>loading results.......</div>;
  }

  if (!props.searching && props.err) {
    return <div>Error while loading results</div>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Hidden smDown>
          <Grid item md={2}>
            <CartBox />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={10} container>
          <div className={classes.main}>
            <span className={classes.searchHead}>
              Showing all results for{" "}
              <span className={classes.searchTitle}>{search}</span>
            </span>
            {props.results && <ProductGrid data={props.results} />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories,
    results: state.search.results,
    err: state.search.err,
    searching: state.search.searching,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    search: (query) => dispatch(search(query)),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(SearchProduct);
