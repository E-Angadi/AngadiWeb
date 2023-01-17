import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Orders from "./orders";
import Locations from "./locations";
import ProductManagament from "./products/Managment";
import AddProduct from "./products/AddProduct";
import AddCategory from "./products/AddCategory";
import ComboManagement from "./products/ComboManagement";
import AppBar from "./sekeleton/AppBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Admintheme from "./AdminTheme";
import Banners from "./banners";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";

function AdminRoutes(props) {
  const [authenticate, setAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (props.profile.isLoaded) {
      if (props.auth.uid && props.profile.isAdmin) {
        setAuth(true);
      } else {
        history.push("/");
      }
    }
  }, [props.profile, props.auth]);
  
  // useEffect(() => {
  //   if (props.profile.isLoaded) {
  //     if (props.auth.uid ) {
  //       setAuth(true);
  //     } else {
  //       history.push("/");
  //     }
  //   }
  // }, [props.profile, props.auth]);

  if (!authenticate) return <div> Please wait while Authenticating.... </div>;

  return (
    <div>
      <MuiThemeProvider theme={Admintheme}>
        <AppBar Pprops={props} />
        <Switch>
          <Route exact path="/dashboard" component={Orders} />
          <Route exact path="/dashboard/locations" component={Locations} />
          <Route
            exact
            path="/dashboard/products/management"
            component={ProductManagament}
          />
          <Route
            exact
            path="/dashboard/products/addproduct"
            component={AddProduct}
          />
          <Route
            exact
            path="/dashboard/products/addproduct/:productId"
            component={AddProduct}
          />
          <Route
            exact
            path="/dashboard/products/addcategory"
            component={AddCategory}
          />
          <Route
            exact
            path="/dashboard/products/combo"
            component={ComboManagement}
          />
          <Route exact path="/dashboard/banners" component={Banners} />
        </Switch>
      </MuiThemeProvider>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

export default withRouter(connect(mapStatetoProps, null)(AdminRoutes));
