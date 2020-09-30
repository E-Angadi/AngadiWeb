import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Person from "@material-ui/icons/Person";
import LeftDrawerList from "./LeftDrawerList";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    backgroundColor: "#f0f0f0",
  },
  menuButton: {
    color: theme.palette.primary.main,
    fontSize: "2.1875rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.54rem",
    },
  },
  header: {
    width: "245px",
    backgroundColor: theme.palette.secondary.main,
  },
  headerDiv: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
  hello: {
    marginLeft: 5,
    fontWeight: 300,
  },
  headerBtns: {
    marginBottom: theme.spacing(1),
    width: "100%",
    textTransform: "none",
  },
  footer: {
    width: "245px",
    position: "fixed",
    top: "auto",
    bottom: "0",
    padding: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  footerSpan: {
    marginBottom: theme.spacing(1),
    display: "block",
    "&>a": {
      color: theme.palette.primary.dark,
    },
    footerAppImgs: {
      width: "100%",
    },
  },
}));

function LeftDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <div>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon className={classes.menuButton} />
      </IconButton>
      <Drawer
        anchor={"left"}
        variant="temporary"
        open={open}
        onClose={() => toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Toolbar className={classes.header}>
          <Grid container>
            <Grid item xs={8}>
              <div className={classes.headerDiv}>
                <Person />
                <p className={classes.hello}>Hello, Sign in</p>
              </div>
            </Grid>
            <Grid xs={4} item container justify="flex-end">
              <Grid item>
                <IconButton
                  aria-label="close"
                  onClick={() => toggleDrawer(false)}
                >
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
            <Grid xs={12} container item justify="space-around" spacing={1}>
              <Grid item xs={6}>
                <Button
                  className={classes.headerBtns}
                  color="primary"
                  variant="outlined"
                >
                  Account
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.headerBtns}
                  color="primary"
                  variant="outlined"
                >
                  Orders
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>

        <LeftDrawerList />

        <div className={classes.footer}>
          <h2>Contact Us</h2>
          <span className={classes.footerSpan}>
            {" "}
            WhatsApp us :{" "}
            <a
              href="https://wa.me/917000370003?text=Hi"
              target="_blank"
              rel="noopener noreferrer"
            >
              7981415977
            </a>
          </span>
          <span className={classes.footerSpan}>
            If you encounter any bugs, glitches, lack of functionality, delayed
            deliveries, billing errors or other problems, Kindly email us on{" "}
            <a
              href="mailto:t.bharathchandra@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              t.bharathchandra@gmail.com
            </a>
          </span>
          <h3>Download App</h3>
          <Grid container justify="space-around" spacing={1}>
            <Grid item xs={6}>
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/imgs/play_store.png"
                  alt="Download suryakantham app from playstore"
                />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/imgs/ios_store.png"
                  alt="Download suryakantham app from appsrore"
                />
              </a>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </div>
  );
}

export default LeftDrawer;
