import React, { useState } from "react";
import {
  makeStyles,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Done, Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  orderBtns: {
    color: theme.palette.primary.dark,
    marginButton: theme.spacing(1),
  },
  dialog: {
    minWidth: 300,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ActionButton(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    if (props.deliver) {
      props.handleDelivery(props.id);
    } else {
      props.handleCancel(props.id);
    }
    handleClose();
  };

  return (
    <div>
      <Tooltip title={props.deliver ? "Delivered Order" : "Cancel Order"}>
        <IconButton
          onClick={handleClickOpen}
          aria-label={props.deliver ? "Delivered" : "Cancel"}
          className={classes.orderBtns}
        >
          {props.deliver ? <Done /> : <Clear />}
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.dialog}>Alert!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.deliver
              ? "Delivered Order ?"
              : "Are you sure to cancel order ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ActionButton;
