import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import SideDrawer from "./SideDrawer";
import Dashboard from "@material-ui/icons/Dashboard";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.secondary.main,
  },
  brandImg: {
    height: "100px",
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "50px",
      width: "auto",
    },
  },
  root: {
    display: "flex",
  },
  dashboardIcon: {
    fontSize: "1.6rem",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  dashboardText: {
    fontSize: "1.6rem",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginLeft: "10px",
    fontFamily: "Arial",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  dashboardDiv: {
    display: "flex",
    alignItems: "center",
  },
  mainLogo: {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  divider: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "30px",
    marginRight: "-10px",
  },
}));

function TopAppBar({ props }) {
  const classes = useStyles();
  const logo = "/imgs/logo.png";

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.mainLogo}>
            <div className={classes.dashboardDiv}>
              <Dashboard className={classes.dashboardIcon} />
              <span className={classes.dashboardText}>Dashboard</span>
            </div>
            <Divider
              className={classes.divider}
              orientation="vertical"
              flexItem={true}
              light={true}
            />
            <img
              src={logo}
              alt={"Suryakantham Sahaajahaara"}
              className={classes.brandImg}
            />
          </div>
        </Toolbar>
      </AppBar>
      <SideDrawer
        {...props}
        open={mobileOpen}
        handleOpen={handleDrawerToggle}
      />
    </div>
  );
}

export default TopAppBar;
