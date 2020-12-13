import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AdminRoutes from "./components/dashboard/AdminRoutes";
import PublicRoutes from "./components/frontend/PublicRoutes";
import { configs } from "./config/configs";

function App() {
  useEffect(() => {
    document.title = configs.title;
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard" component={AdminRoutes} />
        <Route path="/" component={PublicRoutes} />
      </Switch>
    </div>
  );
}

export default App;
