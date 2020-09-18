import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import AdminRoute from './components/dashboard/AdminRouter';
import PublicRoute from './components/frontend/PublicRouter';
import Home from './components/frontend/Home';
import Orders from './components/dashboard/orders';
import Users from './components/dashboard/users';
import ProductManagament from './components/dashboard/products/Managment';
import ProductGrid from './components/dashboard/products/ProductGrid';
import ComboManagement from './components/dashboard/products/ComboManagement';

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path='/' component={Home} />
        <AdminRoute exact path='/myspace' component={Orders} />
        <AdminRoute exact path='/myspace/users' component={Users} />
        <AdminRoute exact path='/mysapce/products' component={ProductManagament} />
        <AdminRoute exact path='/mysapce/products/grid' component={ProductGrid} />
        <AdminRoute exact path='/mysapce/products/combo' component={ComboManagement} />
      </Switch>
    </div>
  );
}


export default App;
