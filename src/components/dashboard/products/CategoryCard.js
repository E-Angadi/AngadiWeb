import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import UploadImageButton from "../../common/UploadImageButton";
import CategoryEditDialog from "./CategoryEditDialog";
import DeleteIconDialog from "../../common/DeleteIconDialog";
import { connect } from "react-redux";
import {
  updateCategoryTitle,
  updateCategoryImage,
  deleteCategory,
} from "../../../store/actions/categoryActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    width: "100%",
    paddingTop: "100%",
  },
  imageBtnStyles: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

function CategoryCard({ category }) {
  const classes = useStyles();
  const [title, setTitle] = useState(category.title);
  const [imageURL, setImageURL] = useState(category.imageURL);

  const imageSave = (filesObj) => {
    console.log(filesObj);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <CategoryEditDialog title={title} />
            <DeleteIconDialog />
          </>
        }
        title={title}
      />
      <CardMedia className={classes.media} image={imageURL} title={title} />
      <CardActions>
        <Grid container justify="center">
          <Grid item>
            <UploadImageButton
              text={"Change Image"}
              callbackSave={imageSave}
              className={classes.imageBtnStyles}
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

const matchDispatchToProps = (dispatch) => {
  return {
    updateTitle: (category) => dispatch(updateCategoryTitle(category)),
    updateImage: (category, imageData) =>
      dispatch(updateCategoryImage(category, imageData)),
    delete: (category) => dispatch(deleteCategory(category)),
  };
};

export default connect(null, matchDispatchToProps)(CategoryCard);
