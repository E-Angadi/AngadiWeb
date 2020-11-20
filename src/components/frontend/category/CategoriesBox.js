import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadCategories } from "../../../store/actions/categoryActions";

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

    cursor: "pointer",
    "& a": {
      textDecoration: "none",
      color: "#6f7284",
      fontWeight: 200,
      "&:hover": {
        color: "#000000",
      },
    },
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

  useEffect(() => {
    props.loadCategories();
  }, []);

  return (
    <div className={classes.root}>
      <span className={classes.heading}>Categories</span>
      <div className={classes.menu}>
        {scat &&
          scat.map((cat, idx) => (
            <div key={idx} className={classes.list}>
              <Link to={"/category/" + cat.id}>{cat.title}</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadCategories()),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(CategoriesBox);
