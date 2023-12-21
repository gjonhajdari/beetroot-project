import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const Home = ({isAuth, history}) => {
    if(isAuth) {
        history.push('/dashboard')
    }
    return (
        <div className=" wrap-home">
            <h1 className="home-page-title">Java Script Advanced Project</h1>
        </div>
    )
}

export default connect(
    ({auth}) => ({
        isAuth: auth.isAuth
    })
)(withRouter(Home));