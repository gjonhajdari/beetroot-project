import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        <Route {...rest}  render = {props  => isAuth ?
            (<Component  {...props} />)
             :
            (<Redirect to='/login' />)
          }/>
    )
}



export default connect(
    ({auth}) => ({
        isAuth: auth.isAuth
    })
)(PrivateRoute)