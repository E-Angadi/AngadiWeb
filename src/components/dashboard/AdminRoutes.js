import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import Orders from './orders';
import Users from './users';
import ProductManagament from './products/Managment';
import AddProduct from './products/AddProduct';
import ComboManagement from './products/ComboManagement';
import AppBar from './sekeleton/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Admintheme from "./AdminTheme";

export class AdminRoutes extends Component {
    
    render() {
        return (
            <div>
                <MuiThemeProvider theme={Admintheme}>
                    <AppBar props={this.props} />
                    <Switch>
                        <Route exact path='/myspace' component={Orders}/>
                        <Route exact path='/myspace/users' component={Users}/>
                        <Route exact path='/myspace/products' component={ProductManagament}/>
                        <Route exact path='/myspace/products/add' component={AddProduct}/>
                        <Route exact path='/myspace/products/combo' component={ComboManagement}/>
                    </Switch>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default AdminRoutes
