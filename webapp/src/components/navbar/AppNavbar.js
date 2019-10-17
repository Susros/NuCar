/** 
 * AppNavbar has the buttons to redirect to login and register page
 * if user is not logged in. If use is logged in, it has profile
 * dropdown menu.
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import h_logo_light from '../../img/h_logo_light.png';

class SimpleNavBar extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark sticky-top">
                <Link className="navbar-brand" to="/">
                    <img src={ h_logo_light } height="45" title="NuCar" alt="NuCar"/>
                </Link>

                <div>
                    <Link to="/login" title="Login" className="btn btn-outline-light mr-2">Login</Link>
                    <Link to="/register" title="Register" className="btn btn-success">Sign Up</Link>
                </div>
            </nav>
        );
    }
}

export default SimpleNavBar;