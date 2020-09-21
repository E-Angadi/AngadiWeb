import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteForever from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

function DeleteIconDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { alertText } = props;

  const handleSubmit = () => {
    // TODO: Dispatch Change Title Action
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="deleteforever" onClick={handleClickOpen}>
        <DeleteForever />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Comfirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {alertText ? alertText : "Are you sure to delete this entity?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Yes, Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteIconDialog;
