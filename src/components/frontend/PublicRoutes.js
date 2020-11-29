import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "./appbar/AppBar";
import Home from "./home/Home";
import PublicTheme from "./PublicTheme";
import AllCategories from "./category/AllCategories";
import Cart from "./cart/Cart";
import ProductDetails from "./product/ProductDetails";
import Review from "../frontend/cart/Review";
import CategoryProducts from "../frontend/category/CategoryProducts";
import SearchProduct from "../frontend/product/SearchProduct";
import PageNotFound from "./NotFound";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Account from "./auth/Account";
import Footer from "./home/Footer";
import SpecialProducts from "./product/SpecialProducts";

class PublicRoutes extends Component {
  render() {
    return (
      <MuiThemeProvider theme={PublicTheme}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={AllCategories} />
          <Route exact path="/deals" component={SpecialProducts} />
          <Route exact path="/checkout/cart" component={Cart} />
          <Route exact path="/checkout/review" component={Review} />
          <Route exact path="/checkout/payment" component={Review} />
          <Route exact path="/product/:productId" component={ProductDetails} />
          <Route
            exact
            path="/category/:categoryId"
            component={CategoryProducts}
          />
          <Route exact path="/search/:searchParam" component={SearchProduct} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/account" component={Account} />
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </MuiThemeProvider>
    );
  }
}

export default PublicRoutes;
