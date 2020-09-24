import React, { useState, useEffect } from "react";
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

function CategoryCard(props) {
  const classes = useStyles();
  const [title, setTitle] = useState(props.category.title);
  const [imageURL, setImageURL] = useState(props.category.imageURL);

  const imageSave = (filesObj, update) => {
    if (filesObj.length > 0 && update) {
      props.updateImage(props.category, filesObj[0].data);
    }
  };

  useEffect(() => {
    setImageURL(props.category.imageURL);
    setTitle(props.category.title);
  }, [props.category, props.title]);

  const handleUpdateTitle = (newTitle) => {
    setTitle(newTitle);
    const update = {
      ...props.category,
      title: newTitle,
    };
    props.updateTitle(update);
  };

  const handleDelete = () => {
    props.delete(props.category);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <>
            <CategoryEditDialog
              title={title}
              callbackUpdate={handleUpdateTitle}
            />
            <DeleteIconDialog
              callbackDelete={handleDelete}
              alertText="Are sure to delete this category?"
            />
          </>
        }
        title={title}
      />
      <CardMedia
        className={classes.media}
        image={imageURL ? imageURL : "/imgs/defualt.jpg"}
        alt={title}
        title={title}
      />
      <CardActions>
        <Grid container justify="center">
          <Grid item>
            <UploadImageButton
              text={"Change Image"}
              callbackSave={imageSave}
              className={classes.imageBtnStyles}
              filesLimit={1}
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
