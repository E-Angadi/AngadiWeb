import React from "react";
import { makeStyles, Grid, Divider, Paper, Switch } from "@material-ui/core";
import UploadImageButton from "../../common/UploadImageButton";
import { connect } from "react-redux";
import {
  updateCategoryText,
  updateCategoryImage,
  deleteCategory,
  updateCategoryBannerImage,
  removeUnit,
  changeVisibility,
} from "../../../store/actions/categoryActions";
import DeleteIconDialog from "../../common/DeleteIconDialog";
import CategoryEditDialog from "./CategoryEditDialog";
import AddUnitForm from "./AddUnitForm";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    backgroundColor: "#FFFFFF",
    marginRight: "10px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginBottom: "10px",
    },
    paddingBottom: "20px",
  },
  bannerImage: {
    width: "100%",
  },
  image: {
    width: "100%",
    marginLeft: theme.spacing(2),
  },
  bannerImageUpdate: {
    position: "relative",
    bottom: 75,
    display: "inline-block",
    marginBottom: -65,
  },
  imageUpdate: {
    position: "relative",
    bottom: 75,
    left: 20,
    display: "inline-block",
    marginBottom: -65,
  },
  title: {
    marginLeft: 40,
    fontSize: 30,
    color: "#000000",
  },
  description: {
    marginLeft: 40,
    marginRight: 10,
    color: "grey",
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: -20,
    marginBottom: 10,
  },
  paper: {
    margin: theme.spacing(1),
    marginLeft: 0,
    padding: theme.spacing(1),
    backgroundColor: "#EAEDED",
  },
  unitTitle: {
    fontSize: 18,
  },
  deleteIcon: {
    float: "right",
  },
}));

function CategoryDetails(props) {
  const classes = useStyles();

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

  const handleUpdateText = (newTitle, newDescription) => {
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

  const deSerializeItems = (units) => {
    const items = [];
    if (!units) return items;
    const citems = units.split("|");
    citems.forEach((c) => {
      const sc = c.split(";");
      if (sc.length === 2)
        items.push({ title: sc[0], visibility: sc[1] === "1" });
    });
    return items;
  };

  const handleUnitDelete = (idx) => {
    props.removeUnit(props.category.id, idx);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <img
            className={classes.bannerImage}
            src={props.category.bannerImageURL}
            alt={props.category.title}
          />
          <UploadImageButton
            className={classes.bannerImageUpdate}
            rounded={true}
            filesLimit={1}
            callbackSave={bannerImageSave}
          />
        </Grid>
        <Grid item xs={3}>
          <img
            className={classes.image}
            src={props.category.imageURL}
            alt={props.category.title}
          />
          <UploadImageButton
            className={classes.imageUpdate}
            rounded={true}
            filesLimit={1}
            callbackSave={imageSave}
          />
        </Grid>
        <Grid item xs={9} container alignContent="flex-start">
          <Grid item xs={9} container spacing={2}>
            <Grid item xs="auto">
              <span className={classes.title}> {props.category.title} </span>
            </Grid>
            <Grid item xs="auto">
              <CategoryEditDialog
                title={props.category.title}
                description={props.category.description}
                callbackUpdate={handleUpdateText}
              />
            </Grid>
          </Grid>
          <Grid item xs={3} container justify="flex-end">
            <Grid item xs="auto">
              <DeleteIconDialog
                callbackDelete={handleDelete}
                alertText="Are sure to delete this category?"
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.description}>
              {props.category.description}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <AddUnitForm categoryId={props.category.id} />
        </Grid>
        <Grid item xs={6}>
          {deSerializeItems(props.category.units).map((unit, idx) => (
            <Paper key={idx} className={classes.paper}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs="auto">
                  <Switch
                    color="primary"
                    onChange={() =>
                      props.changeVisibility(
                        !unit.visibility,
                        unit.title,
                        props.category.id
                      )
                    }
                    checked={unit.visibility}
                  />
                  <span className={classes.unitTitle}>{unit.title}</span>
                </Grid>
                <Grid item xs="auto">
                  <DeleteIconDialog
                    callbackDelete={() => handleUnitDelete(idx)}
                    alertText="Are sure to delete this unit?"
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
          <b>Note:</b> Use switch button to change visibility of all the
          products using that unit.
        </Grid>
      </Grid>
    </div>
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
    removeUnit: (categoryId, unit) => dispatch(removeUnit(categoryId, unit)),
    changeVisibility: (visibility, unit, categoryId) =>
      dispatch(changeVisibility(visibility, unit, categoryId)),
  };
};

export default connect(null, matchDispatchToProps)(CategoryDetails);
