import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AdminRoutes from './components/dashboard/AdminRoutes';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/myspace' component={AdminRoutes}/>
      </Switch>
    </div>
  );
}


export default App;
