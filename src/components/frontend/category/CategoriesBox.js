import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const categories = [
  "Fruits & Vegetables",
  "Dairy & Backery",
  "Staples",
  "Snacks & Branded Food",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Dairy & Backery",
  "Staples",
  "Snacks & Branded Food",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Fruits & Vegetables",
  "Dairy & Backery",
  "Staples",
  "Snacks & Branded Food",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Dairy & Backery",
  "Staples",
  "Snacks & Branded Food",
  "Personal Care",
  "Home Care",
  "Baby Care",
];

const sliceCat = (categories, limit = 15) => {
  if (categories.length > limit) {
    return categories.slice(0, limit);
  }
  return categories;
};

function CategoriesBox() {
  const classes = useStyles();
  const scat = sliceCat(categories);

  return (
    <div className={classes.root}>
      <span className={classes.heading}>Categories</span>
      <div className={classes.menu}>
        {scat.map((cat, idx) => (
          <div key={idx} className={classes.list}>
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesBox;
