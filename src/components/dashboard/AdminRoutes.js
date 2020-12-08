import React, { Component } from "react";
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

export class AdminRoutes extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={Admintheme}>
          <AppBar Pprops={this.props} />
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
}

export default AdminRoutes;
