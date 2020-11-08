import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
  },
  heading: {
    fontSize: 20,
    fontWeight: 400,
    color: "#000000",
    borderBottom: "1px solid rgba(21,27,57,.04)",
    paddingBottom: theme.spacing(2),
    width: "100%",
    display: "inline-block",
  },
  list: {
    marginBottom: 5,
    borderBottom: "1px solid rgba(21,27,57,.04)",
    paddingTop: 5,
    paddingBottom: 10,
    color: "#6f7284",
    fontWeight: 200,
    "&:hover": {
      color: "#000000",
    },
    cursor: "pointer",
  },
}));

const sliceCat = (categories, limit = 15) => {
  if (!categories) return categories;
  if (categories.length > limit) {
    return categories.slice(0, limit);
  }
  return categories;
};

function CategoriesBox(props) {
  const classes = useStyles();
  const scat = sliceCat(props.categories);

  return (
    <div className={classes.root}>
      <span className={classes.heading}>Categories</span>
      <div className={classes.menu}>
        {scat &&
          scat.map((cat, idx) => (
            <div key={idx} className={classes.list}>
              {cat.title}
            </div>
          ))}
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
)(CategoriesBox);
