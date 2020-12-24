import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { LibraryAdd } from "@material-ui/icons";
import { Paper } from "@material-ui/core";

import AddCategoryForm from "./AddCategoryForm";
import CategoryTable from "./CategoryTable";
import CategoryDetails from "./CategoryDetails";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    paddingBottom: 20,
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
  paperStyles: {
    margin: "20px",
    padding: "20px",
  },
}));

function AddCategory(props) {
  const classes = useStyles();
  const [categorySelected, setCategorySelected] = useState({});

  const changeCategorySelected = (category) => {
    setCategorySelected(category);
  };

  useEffect(() => {
    if (props.categories && props.categories.length > 0) {
      setCategorySelected(props.categories[0]);
    }
  }, [props.categories]);

  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Manage Category"}
        icon={<LibraryAdd fontSize="large" />}
        subTitle={"Add and edit categories in the listing"}
      />
      <Grid container justify="center">
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paperStyles}>
            <AddCategoryForm />
          </Paper>
        </Grid>
      </Grid>

      {props.categories && props.categories.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <CategoryTable
              categories={props.categories}
              categorySelected={categorySelected}
              changeCategorySelected={changeCategorySelected}
            />
          </Grid>
          <Grid item xs={8}>
            <CategoryDetails category={categorySelected} />
          </Grid>
        </Grid>
      )}
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
)(AddCategory);
