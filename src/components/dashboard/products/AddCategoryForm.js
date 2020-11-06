import React, { useState, useEffect } from "react";
import Form from "../../common/Form";
import { Grid, Typography } from "@material-ui/core";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";
import UploadImageButton from "../../common/UploadImageButton";
import { connect } from "react-redux";
import {
  createCategory,
  closeSnackbar,
  disableSubmit,
} from "../../../store/actions/categoryActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialFValues = {
  title: "",
  imageData: "",
  bannerImageData: "",
  description: "",
};

function AddCategoryForm(props) {
  const [sanckbarStatus, setSnackbarStatus] = useState(props.categoryStatus);

  useEffect(() => {
    setSnackbarStatus(props.categoryStatus);
  }, [props.categoryStatus]);

  const handleSnackbarClose = () => {
    props.closeSnackbar();
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title = fieldValues.title ? "" : "This field is required.";
    if ("description" in fieldValues)
      tmp.description = fieldValues.description
        ? ""
        : "This field is required.";
    if ("bannerImageData" in fieldValues)
      tmp.bannerImageData =
        values.bannerImageData === "" ? "Banner image is required" : "";
    if ("imageData" in fieldValues)
      tmp.imageData = values.imageData === "" ? "Image is required" : "";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.disableSubmit();
      props.createCategory({
        ...values,
      });
      resetForm();
    }
  };

  const imageSave = (fileobjs) => {
    if (fileobjs.length > 0) {
      setValues({
        ...values,
        imageData: fileobjs[0].data,
      });
    } else {
      setValues({
        ...values,
        imageData: "",
      });
    }
  };

  const bannerImageSave = (fileobjs) => {
    if (fileobjs.length > 0) {
      setValues({
        ...values,
        bannerImageData: fileobjs[0].data,
      });
    } else {
      setValues({
        ...values,
        bannerImageData: "",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid xs={12} item container justify="center" alignItems="center">
          <Grid xs={12} item>
            <Typography component="div" variant="h6" color="primary">
              {"Add New Category"}
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Controls.Input
              name="title"
              label="Title"
              value={values.title || ""}
              onChange={handleInputChange}
              error={errors.title}
            />
          </Grid>
          <Grid xs={12} item>
            <Controls.InputArea
              name="description"
              label="Description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              rowsMax={5}
            />
          </Grid>
        </Grid>
        <Grid direction="row" container justify="center" alignItems="center">
          <Grid item>
            <Controls.ImageView
              alt="Product uploaded"
              src={
                values.imageData === "" ? "/imgs/default.jpg" : values.imageData
              }
              width={200}
              error={errors.imageData}
            />
          </Grid>
          <Grid item>
            <Controls.ImageView
              alt="Product uploaded"
              src={
                values.bannerImageData === ""
                  ? "/imgs/1000x200.png"
                  : values.bannerImageData
              }
              width={500}
              height={100}
              error={errors.bannerImageData}
            />
          </Grid>
        </Grid>
        <Grid direction="row" container justify="center" alignItems="center">
          <Grid item>
            <UploadImageButton filesLimit={1} callbackSave={imageSave} />
          </Grid>
          <Grid item>
            <UploadImageButton
              text="Add Banner Image"
              filesLimit={1}
              callbackSave={bannerImageSave}
            />
          </Grid>
          <Grid item>
            <Controls.Button
              disabled={sanckbarStatus.disableSubmit}
              type="submit"
              text="Submit"
            />
          </Grid>
          <Grid item>
            <CircularProgress
              size={30}
              style={!sanckbarStatus.disableSubmit && { display: "none" }}
            />
          </Grid>
        </Grid>
      </Form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={sanckbarStatus.snackbarStatus}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        key={"topright"}
      >
        <Alert onClose={handleSnackbarClose} severity={sanckbarStatus.variant}>
          {sanckbarStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    categoryStatus: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (category) => dispatch(createCategory(category)),
    closeSnackbar: () => dispatch(closeSnackbar()),
    disableSubmit: () => dispatch(disableSubmit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);
