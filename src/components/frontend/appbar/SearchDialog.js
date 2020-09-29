import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Search, ArrowBackIos } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchInput: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: "#FFFFFF",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { onChange, onSubmit, value } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    onSubmit(e);
    e.preventDefault();
  };

  return (
    <>
      <IconButton aria-label="search" onClick={handleClickOpen}>
        <Search color="primary" />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIos />
            </IconButton>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    type="search"
                    margin="normal"
                    variant="outlined"
                    className={classes.searchInput}
                    onChange={(e) => onChange(e)}
                  >
                    {value}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <IconButton type="submit" color="primary" aria-label="search">
                    <Search />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Toolbar>
        </AppBar>
      </Dialog>
    </>
  );
}

export default SearchDialog;
