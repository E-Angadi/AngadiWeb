import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Form from "../../common/Form";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
}));

const initialFValues = {
  title: "",
  visibility: true,
};

function AddUnitForm() {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title = fieldValues.title ? "" : "This field is required.";
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
      resetForm();
    }
  };

  return (
    <div className={classes.root}>
      <Form onSubmit={handleSubmit}>
        <div className={classes.heading}>Add New Unit</div>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8}>
            <Controls.Input
              name="title"
              label="Title"
              value={values.title || ""}
              onChange={handleInputChange}
              error={errors.title}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Button type="submit" text="Add Unit" />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}

export default AddUnitForm;
