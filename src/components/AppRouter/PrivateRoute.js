import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isAuth,
    component:Component,
    ...rest
})=>(
    <Route {...rest} component={(props)=>(
        isAuth ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
        )}
    />
);

const mapStateToProps = (state) => ({
    isAuth: !!state.live_user.user?state.live_user.user.length:false
})

export default connect(mapStateToProps)(PrivateRoute)