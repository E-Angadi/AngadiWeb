import React from 'react'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import {Visibility, BorderColor, Message, Person, ImportExport, TrendingUp, Store, ExpandLess, ExpandMore, ViewCarousel } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    iconRoot: {
        color: '#215273',
        marginLeft: 10,

    },
    itemRoot: {
        color: '#215273',
        fontWeight: 600,
        fontFamily: 'Arial'
    },
    nested: {
        paddingLeft: theme.spacing(7),
    },
    divider: {
        marginTop: 20,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
    }
}));

const itemsList1 = [
    {
        name: "Orders",
        icon: BorderColor,
        link: "/myspace"
    },
    {
        name: "User Managment",
        icon: Person,
        link: "/myspace/users"
    },
    {
        name: "Banners",
        icon: ViewCarousel,
        link: "/myspace/banners",
    },
    {
        name: "Messages",
        icon: Message,
        link: "/myspace/messages"
    },
    {
        name: "Export",
        icon: ImportExport,
        link: "/myspace/export"
    },
    {
        name: "Visits",
        icon: Visibility,
        link: "/myspace/visits"
    },
    {
        name: "Analytics",
        icon: TrendingUp,
        link: "/myspace/analytics"
    },
    
]

const itemsList2 = [
    {
        name: "Product Management",
        link: "/myspace/products"
    },
    {
        name: "Add Product & Categories",
        link: "/myspace/products/add"
    },
    {
        name: "Combo Management",
        link: "/myspace/products/combo"
    },
]

function DrawerList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List>
            {itemsList1.map(({name, icon: Icon, link}, idx) => {
                var isSelected = (props.match.path===link);
                return(
                <ListItem component={Link} to={link} key={idx} button selected={isSelected}>
                    <ListItemIcon><Icon className={classes.iconRoot}/></ListItemIcon>
                    <ListItemText className={classes.itemRoot} primary={name} />
                </ListItem>
                );
            })}
            <Divider className={classes.divider} />
            <ListItem button onClick={handleClick}>
                <ListItemIcon><Store className={classes.iconRoot}/></ListItemIcon>
                <ListItemText className={classes.itemRoot} primary={"Store Listing"} />
                {open ? <ExpandLess className={classes.iconRoot}/> : <ExpandMore className={classes.iconRoot}/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {itemsList2.map(({name, link}, idx) => {
                        var isSelected = (props.match.path===link);
                        return(
                        <ListItem button key={idx} component={Link} to={link} selected={isSelected} className={classes.nested}>
                            <ListItemText className={classes.itemRoot} primary={name} />
                        </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    )
}

export default DrawerList
