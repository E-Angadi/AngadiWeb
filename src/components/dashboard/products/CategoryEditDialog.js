import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Edit from "@material-ui/icons/Edit";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";

function CategoryEditDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title, description, callbackUpdate } = props;
  console.log(title);
  console.log(description);

  const initialFValues = {
    title: title ? title : "Category Title",
    description: description ? description : "Description",
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title = fieldValues.title ? "" : "This field is required.";
    if ("description" in fieldValues)
      tmp.description = fieldValues.description
        ? ""
        : "This field is required.";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  useEffect(() => {
    setValues({
      title: props.title,
      description: props.description,
    });
  }, [props.title, props.description]);

  const { values, errors, setErrors, handleInputChange, setValues } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = () => {
    if (!validate()) {
      setErrors({
        ...errors,
        title: "This field is required",
        description: "This field is required",
      });
      return;
    }
    callbackUpdate(values.title, values.description);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen} color="primary">
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Category Name</DialogContentText>
          <Controls.Input
            name="title"
            label="Title"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
          />
          <Controls.InputArea
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            rowsMax={5}
            style={{ width: "100%", marginTop: 8 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoryEditDialog;
