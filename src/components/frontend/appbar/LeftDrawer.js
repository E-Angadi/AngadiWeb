import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Person from "@material-ui/icons/Person";
import LeftDrawerList from "./LeftDrawerList";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { configs } from "../../../config/configs";

const useStyles = makeStyles((theme) => ({
  root: {},
  drawerPaper: {
    backgroundColor: "#f0f0f0",
    overflowX: "hidden",
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
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  headingFooter: {
    paddingLeft: theme.spacing(2),
  },
  footerSpan: {
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    display: "block",
    "&>a": {
      color: theme.palette.primary.dark,
    },
    footerAppImgs: {
      width: "100%",
    },
  },
  toolbar: {
    width: "245px",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function LeftDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const handleClick = () => {
    setOpen(false);
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
        <div className={classes.toolbar}>
          <Grid container>
            <Grid item xs={8}>
              <div className={classes.headerDiv}>
                <Person />
                <p className={classes.hello}>
                  Hello, {props.auth.uid ? props.profile.name : "Sign in"}{" "}
                </p>
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
                  component={Link}
                  to={props.auth.uid ? "/account" : "/signin"}
                  onClick={handleClick}
                >
                  {props.auth.uid ? "Account" : "Sign In"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.headerBtns}
                  color="primary"
                  variant="outlined"
                  component={Link}
                  to={props.auth.uid ? "/account" : "/signup"}
                  onClick={handleClick}
                >
                  {props.auth.uid ? "Orders" : "Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <LeftDrawerList onClick={handleClick} />

        <div className={classes.footer}>
          <h2 className={classes.headingFooter}>Contact Us</h2>
          <span className={classes.footerSpan}>
            {" "}
            WhatsApp us :{" "}
            <a
              href={
                "https://wa.me/" +
                configs.contactInfo.watsappNum +
                "?text=Needed support"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {configs.contactInfo.watsappNum}
            </a>
          </span>
          <span className={classes.footerSpan}>
            If you encounter any bugs, glitches, lack of functionality, delayed
            deliveries, billing errors or other problems, Kindly email us on{" "}
            <a
              href={"mailto:" + configs.contactInfo.email}
              target="_blank"
              rel="noopener noreferrer"
            >
              {configs.contactInfo.email}
            </a>
          </span>
          <h3 className={classes.headingFooter}>Download App</h3>
          <Grid
            className={classes.headingFooter}
            container
            justify="space-around"
            spacing={1}
          >
            <Grid item xs={6}>
              <a
                href={configs.contactInfo.androidAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/imgs/play_store.png"
                  alt="Download app from playstore"
                />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a
                href={configs.contactInfo.iosAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/imgs/ios_store.png"
                  alt="Download app from appsrore"
                />
              </a>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default connect(mapStatetoProps, null)(LeftDrawer);
