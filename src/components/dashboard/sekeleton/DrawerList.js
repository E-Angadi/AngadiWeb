import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import {
  Visibility,
  BorderColor,
  Message,
  ImportExport,
  TrendingUp,
  Store,
  ExpandLess,
  ExpandMore,
  ViewCarousel,
  LocationOn,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  iconRoot: {
    color: "#215273",
    marginLeft: 10,
  },
  itemRoot: {
    color: "#215273",
    fontWeight: 600,
    fontFamily: "Arial",
  },
  nested: {
    paddingLeft: theme.spacing(7),
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },
}));

const base = "/dashboard";

const itemsList1 = [
  {
    name: "Orders",
    icon: BorderColor,
    link: `${base}`,
  },
  {
    name: "Locations",
    icon: LocationOn,
    link: `${base}/locations`,
  },
  {
    name: "Banners",
    icon: ViewCarousel,
    link: `${base}/banners`,
  },
  {
    name: "Messages",
    icon: Message,
    link: `${base}/messages`,
  },
  {
    name: "Export",
    icon: ImportExport,
    link: `${base}/export`,
  },
  {
    name: "Visits",
    icon: Visibility,
    link: `${base}/visits`,
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    link: `${base}/analytics`,
  },
];

const itemsList2 = [
  {
    name: "Product Management",
    link: `${base}/products/management`,
  },
  {
    name: "Add Product",
    link: `${base}/products/addproduct`,
  },
  {
    name: "Add Categories",
    link: `${base}/products/addcategory`,
  },
  {
    name: "Combo Management",
    link: `${base}/products/combo`,
  },
];

function DrawerList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List>
      {itemsList1.map(({ name, icon: Icon, link }, idx) => {
        var isSelected = props.location.pathname === link;
        return (
          <ListItem
            component={Link}
            to={link}
            key={idx}
            button
            selected={isSelected}
          >
            <ListItemIcon>
              <Icon className={classes.iconRoot} />
            </ListItemIcon>
            <ListItemText className={classes.itemRoot} primary={name} />
          </ListItem>
        );
      })}
      <Divider className={classes.divider} />
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Store className={classes.iconRoot} />
        </ListItemIcon>
        <ListItemText className={classes.itemRoot} primary={"Store Listing"} />
        {open ? (
          <ExpandLess className={classes.iconRoot} />
        ) : (
          <ExpandMore className={classes.iconRoot} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {itemsList2.map(({ name, link }, idx) => {
            var pathlen = props.location.pathname.split("/");
            var linklen = link.split("/");
            var isSelected =
              (pathlen.length === linklen.length ||
                pathlen.length === linklen.length + 1) &&
              props.location.pathname.startsWith(link);
            return (
              <ListItem
                button
                key={idx}
                component={Link}
                to={link}
                selected={isSelected}
                className={classes.nested}
              >
                <ListItemText className={classes.itemRoot} primary={name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}

export default DrawerList;
