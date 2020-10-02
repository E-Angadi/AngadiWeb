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
import Button from "@material-ui/core/Button";

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
    borderRadius: "0px",
  },
  searchBtn: {
    width: "40px",
    height: "40px",
    marginLeft: "-4px",
    backgroundColor: theme.palette.primary.light,
    color: "#FFFFFF",
    padding: "0px",
    minWidth: "40px",
    borderRadius: "0px",
    "& .MuiButton-label": {
      width: "20px",
      margin: "0px",
    },
    "& .MuiButton-startIcon": {
      marginRight: "0px",
      marginLeft: "0px",
    },
  },
  form: {
    width: "96%",
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
            <form
              className={classes.form}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={10}>
                  <TextField
                    type="search"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    className={classes.searchInput}
                    onChange={(e) => onChange(e)}
                  >
                    {value}
                  </TextField>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    type="submit"
                    aria-label="search"
                    className={classes.searchBtn}
                    startIcon={<Search />}
                  />
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
