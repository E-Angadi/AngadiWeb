import {Route} from 'react-router-dom';
import React from 'react';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => (
            <div>
                {/* Place AppBar */}
                <Component {...props} />
                {/*PLace Footer */}
            </div>
        )} />
    )
}

export default PublicRoute;