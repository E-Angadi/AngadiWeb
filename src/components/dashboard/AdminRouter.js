import {Route} from 'react-router-dom';
import TopAppBar from './sekeleton/AppBar';
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Admintheme from "./AdminTheme";

const AdminRouter = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} component={(props) => {
            return(
            <div>
                <MuiThemeProvider theme={Admintheme}>
                    <TopAppBar {...props} />
                    <div>
                        <Component {...props} />
                    </div>
                </MuiThemeProvider>
            </div>
            )
        }} />

    )
}

export default AdminRouter;