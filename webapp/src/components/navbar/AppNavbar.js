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
import Axios from 'axios';

class AppNavBar extends Component {

    /**
     * Constructor for SimpleNavBar
     * @param {Object} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            isloggedin: false,
            isloading: true
        }
    }

    /**
     * After component is loaded
     */
    componentDidMount() {

        // Check if logged in
        Axios.get(
            process.env.REACT_APP_API_URL + '/users/login/check',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                withCredentials: true
            }
        ).then(({ data }) => {
            if (data.data.isloggedin) {
                this.setState({ isloggedin: true });
            }
        }).catch(err => {
            this.setState({ isloading: false });
        });

    }

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark sticky-top">
                <Link className="navbar-brand" to="/">
                    <img src={ h_logo_light } height="45" title="NuCar" alt="NuCar"/>
                </Link>

                {
                    (this.state.isloggedin == true) ?
                        <div>
                            <Link to="/login" title="Login" className="btn btn-outline-light mr-2">Login</Link>
                            <Link to="/register" title="Register" className="btn btn-success">Sign Up</Link>
                        </div>
                    :
                       <div>
                            <Link to="/dashboard" title="Dashboard" className="btn btn-outline-light">Dashboard</Link>
                        </div>
                }
            </nav>
        );
    }
}

export default AppNavBar;