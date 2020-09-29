import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AdminRoutes from "./components/dashboard/AdminRoutes";
import PublicRoutes from "./components/frontend/PublicRoutes";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/myspace" component={AdminRoutes} />
        <Route path="/" component={PublicRoutes} />
      </Switch>
    </div>
  );
}

export default App;
