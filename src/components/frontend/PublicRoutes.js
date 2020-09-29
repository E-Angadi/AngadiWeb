import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "./appbar/AppBar";
import Home from "./Home";
import PublicTheme from "./PublicTheme";

class PublicRoutes extends Component {
  render() {
    return (
      <MuiThemeProvider theme={PublicTheme}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default PublicRoutes;
