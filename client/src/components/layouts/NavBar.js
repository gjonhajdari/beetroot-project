import React from 'react';
import {Menu, Image} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {userLogout} from "../../AC/auth";

const Nav = ({isAuth, user , userLogout}) => {
    return (
        <nav>
            <Menu size="huge">
                <Menu.Item >
                    <NavLink className="navbar-brand navbar-logo"  exact to='/'>
                        <img src="/assets/img/logo.svg" />
                    </NavLink>
                </Menu.Item>
                { isAuth ?
                    <Menu.Item>
                        <NavLink  to='/dashboard'>Dashboard</NavLink>
                    </Menu.Item>
                    :
                    null
                }

                {isAuth ?
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Image src={user.avatar}
                                    avatar  size="tiny"
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <p onClick={userLogout}>Logout</p>
                        </Menu.Item>
                    </Menu.Menu>
                    :
                    <Menu.Menu position="right">
                        <Menu.Item >
                            <NavLink to='/register'>Register</NavLink>
                        </Menu.Item>
                        <Menu.Item >
                            <NavLink  to='/login'>Login</NavLink>
                        </Menu.Item>
                    </Menu.Menu>
                }



            </Menu>
        </nav>
    )
}

export default connect(
    ({auth}) => ({
        isAuth: auth.isAuth,
        user: auth.user
    }),
    {userLogout}
)(Nav);