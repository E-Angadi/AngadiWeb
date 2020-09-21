import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import DrawerList from "./DrawerList";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "30px",
  },
  iconRoot: {
    color: theme.palette.primary.main,
  },
  itemRoot: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontFamily: "Arial",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

function SideDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    props.handleOpen();
  };

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.open}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.drawerContainer}>
            <DrawerList {...props} />
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.drawerContainer}>
            <DrawerList {...props} />
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default SideDrawer;
