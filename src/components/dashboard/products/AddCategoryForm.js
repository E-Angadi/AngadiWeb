import React from "react";
import Form from "../../common/Form";
import { Grid, Typography } from "@material-ui/core";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";
import UploadImageButton from "../../common/UploadImageButton";
import { connect } from "react-redux";
import { createCategory } from "../../../store/actions/categoryActions";

const initialFValues = {
  title: "",
  imageData: "",
};

function AddCategoryForm(props) {
  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title = fieldValues.title ? "" : "This field is required.";
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
      props.createCategory({
        title: values.title,
        imageData: values.imageData,
      });
      resetForm();
    }
  };

  const imageSave = (fileobjs) => {
    console.log("image saved called");
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

  return (
    <Form onSubmit={handleSubmit}>
      <Grid xs={12} item container justify="center" alignItems="center">
        <Grid xs={12} item>
          <Typography component="div" variant="h6" color="primary">
            {"Add New Category"}
          </Typography>
        </Grid>
        <Grid xs={9} item>
          <Controls.Input
            name="title"
            label="Title"
            value={values.title || ""}
            onChange={handleInputChange}
            error={errors.title}
          />
        </Grid>
        <Grid xs={3} item>
          <UploadImageButton callbackSave={imageSave} />
        </Grid>
      </Grid>
      <Grid direction="row" container justify="center">
        <Grid item>
          <Controls.ImageView
            alt="Product uploaded"
            src={
              values.imageData === "" ? "/imgs/default.jpg" : values.imageData
            }
            width={200}
            height={200}
            error={errors.imageData}
          />
        </Grid>
      </Grid>
      <Grid direction="row" container>
        <Grid item>
          <Controls.Button type="submit" text="Submit" />
        </Grid>
      </Grid>
    </Form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (category) => dispatch(createCategory(category)),
  };
};

export default connect(null, mapDispatchToProps)(AddCategoryForm);
