import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import UploadImageButton from "../../common/UploadImageButton";
import CategoryEditDialog from "./CategoryEditDialog";
import DeleteIconDialog from "../../common/DeleteIconDialog";
import { connect } from "react-redux";
import {
  updateCategoryText,
  updateCategoryImage,
  deleteCategory,
  updateCategoryBannerImage,
} from "../../../store/actions/categoryActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    width: "100%",
    paddingTop: "100%",
  },
  banner: {
    width: "100%",
    height: "auto",
    paddingTop: "50%",
  },
  imageBtnStyles: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const truncateString = (text, limit) => {
  if (text.length < limit) {
    return text;
  }
  const slicedText = text.slice(0, limit);
  return slicedText + "...";
};

function CategoryCard(props) {
  const classes = useStyles();
  const [title, setTitle] = useState(props.category.title);
  const [description, setDescription] = useState(props.category.description);
  const [imageURL, setImageURL] = useState(props.category.imageURL);
  const [bannerImageURL, setBannerImageURL] = useState(
    props.category.bannerImageURL
  );

  const imageSave = (filesObj, update) => {
    if (filesObj.length > 0 && update) {
      props.updateImage(props.category, filesObj[0].data);
    }
  };

  const bannerImageSave = (filesObj, update) => {
    if (filesObj.length > 0 && update) {
      props.updateBanner(props.category, filesObj[0].data);
    }
  };

  useEffect(() => {
    setImageURL(props.category.imageURL);
    setTitle(props.category.title);
    setDescription(props.category.description);
    setBannerImageURL(props.category.bannerImageURL);
  }, [
    props.category,
    props.title,
    props.category.bannerImageURL,
    props.category.description,
  ]);

  const handleUpdateText = (newTitle, newDescription) => {
    setTitle(newTitle);
    setDescription(newDescription);
    const update = {
      ...props.category,
      title: newTitle,
      description: newDescription,
    };
    props.updateText(update);
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
              description={description}
              callbackUpdate={handleUpdateText}
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
      <CardMedia
        className={classes.banner}
        image={bannerImageURL ? bannerImageURL : "/imgs/1000x200.png"}
        alt={title}
        title={title}
      />
      <CardContent>
        <p style={{ height: 57, overflow: "hidden" }}>
          {truncateString(description, 100)}
        </p>
      </CardContent>
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
          <Grid item>
            <UploadImageButton
              text={"Change Banner Image"}
              callbackSave={bannerImageSave}
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
    updateText: (category) => dispatch(updateCategoryText(category)),
    updateImage: (category, imageData) =>
      dispatch(updateCategoryImage(category, imageData)),
    updateBanner: (category, imageData) =>
      dispatch(updateCategoryBannerImage(category, imageData)),
    delete: (category) => dispatch(deleteCategory(category)),
  };
};

export default connect(null, matchDispatchToProps)(CategoryCard);
