import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search, Person, ShoppingCart } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Link, useHistory } from "react-router-dom";
import Form from "../../common/Form";
import Badge from "@material-ui/core/Badge";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import SearchDialog from "./SearchDialog";
import LeftDrawer from "./LeftDrawer";
import Divider from "@material-ui/core/Divider";
import CategoryBar from "./CategoryBar";

import { connect } from "react-redux";

import { loadCartItems } from "../../../store/actions/cartActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    color: theme.palette.primary.main,
    fontSize: "2.1875rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.54rem",
    },
  },
  brandImg: {
    height: "auto",
    width: "90%",
    minWidth: "200px",
    maxWidth: "330px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
      minWidth: "150px",
    },
  },
  searchInput: {
    width: "100%",
    marginLeft: "20px",
    marginTop: "0px",
    marginBottom: "0px",
    backgroundColor: "#FFFFFF",
    elevation: "8px",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  actionDiv: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: "none",
  },
}));

function MyAppBar(props) {
  const classes = useStyles();
  const logo = "/imgs/logo1.png";
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });
  const [searchText, SetSearchText] = useState();
  const history = useHistory();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    SetSearchText(value);
  };

  const handleSearch = (e) => {
    if (searchText !== "") {
      history.push("/search/" + searchText);
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (props.cart.length === 0) props.loadCartItems();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position={!trigger ? "sticky" : "fixed"}
        elevation={!trigger ? 0 : 1}
        className={classes.appBar}
      >
        <Toolbar>
          <LeftDrawer />
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6} sm={2}>
              <Link to="/">
                <img
                  src={logo}
                  alt={"Suryakantham Sahaajahaara"}
                  className={classes.brandImg}
                />
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item container justify="flex-end" sm={6}>
                <Grid item xs={10}>
                  <Form onSubmit={handleSearch}>
                    <TextField
                      type="search"
                      margin="normal"
                      variant="outlined"
                      className={classes.searchInput}
                      onChange={handleSearchChange}
                      size={"small"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {searchText}
                    </TextField>
                  </Form>
                </Grid>
              </Grid>
            </Hidden>
            <Grid
              container
              item
              xs={6}
              sm={4}
              justify="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Hidden xsDown>
                <Grid item>
                  <Link
                    className={classes.link}
                    to={props.auth.uid ? "/account" : "/signin"}
                  >
                    <div className={classes.actionDiv}>
                      <IconButton aria-label="signin">
                        <Person className={classes.menuButton} />
                      </IconButton>
                      <Hidden smDown>
                        <p>{props.auth.uid ? "Account" : "Sign In"} </p>
                      </Hidden>
                    </div>
                  </Link>
                </Grid>
              </Hidden>
              <Hidden smUp>
                <Grid item>
                  <SearchDialog
                    onChange={handleSearchChange}
                    onSubmit={handleSearch}
                    value={searchText}
                  />
                </Grid>
              </Hidden>

              <Grid item>
                <Link to="/checkout/cart" className={classes.link}>
                  <div className={classes.actionDiv}>
                    <IconButton aria-label="cart">
                      <Badge
                        badgeContent={props.cart.length}
                        color="primary"
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <ShoppingCart
                          onChange={handleSearchChange}
                          onSubmit={handleSearch}
                          value={searchText}
                          className={classes.menuButton}
                        />
                      </Badge>
                    </IconButton>
                    <Hidden smDown>
                      <p>My Cart</p>
                    </Hidden>
                  </div>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>

        <Divider color="primary" />
        <CategoryBar />
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCartItems: (items) => dispatch(loadCartItems(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar);
