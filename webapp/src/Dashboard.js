/**
 * Dashboard page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Notifications from './dashboard/Notifications';
import Messages from './dashboard/Messages';
import Cars from './dashboard/Cars';
import Rentals from './dashboard/Rentals';
import AddCar from './dashboard/AddCar';

import v_logo_light from './img/v_logo_light.png';
import profile_img from './img/profile_img.jpg';

class Dashboard extends Component {
    /**
     * Constructor for DashboardContainer
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            isloading: true
        }
    }

    /**
     * After component is loaded
     */
    componentDidMount() {

        // Get user details
        axios(
            process.env.REACT_APP_API_URL + '/users', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                withCredentials: true
            }
        ).then(({ data }) => {
            this.setState({ user: data.data, isloading: false });
        }).catch(err => {
            this.setState({ user: null, isloading: false });
        });

    }

    render() {

        if (this.state.isloading) {
            return null;
        }

        return(
            <div>
                <BrowserRouter>
                    <div id="dashboard-sidebar">
                        <div className="my-3 text-center">
                            <img 
                                src={ v_logo_light }
                                height="100"
                                alt="NuCar"
                                title="NuCar"
                            />
                        </div>

                        <div className="pt-3">
                            <div className="list-group" id="dashboard-nav">
                                <Link to="/dashboard" className="dashboard-nav-item list-group-item list-group-item-action d-flex justify-content-between align-items-center" id="dashboard-nav-notifications">
                                    <span>
                                        <i className="fas fa-bell mr-1"></i> Notifications
                                    </span>
                                    <span className="badge badge-primary badge-pill">0</span>
                                </Link>

                                <Link to="/dashboard/messages" className="dashboard-nav-item  list-group-item list-group-item-action d-flex justify-content-between align-items-center" id="dashboard-nav-messages">
                                    <span>
                                        <i className="fas fa-envelope mr-1"></i> Messages
                                    </span>
                                    <span className="badge badge-primary badge-pill">0</span>
                                </Link>
                                {
                                    (this.state.user.type == 'owner') ?
                                        <Link to="/dashboard/cars" className="dashboard-nav-item list-group-item list-group-item-action" id="dashboard-nav-cars">
                                            <i className="fas fa-car mr-1"></i> Cars
                                        </Link>
                                    :
                                        <Link to="/dashboard/rentals" className="dashboard-nav-item list-group-item list-group-item-action" id="dashboard-nav-cars">
                                            <i className="fas fa-car mr-1"></i> Rentals
                                        </Link>
                                }
                            </div>
                        </div>

                        <div id="dashboard-profile-btn-container">
                            <div className="border-top border-secondary">
                                <div className="dropright">
                                    <div className="dropdown-toggle cursor-pointer px-3 py-2" id="dashboard-profile-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="row align-items-center">
                                            <div className="col-10">
                                                <img 
                                                    src={ profile_img }
                                                    width="32"
                                                    height="32"
                                                    alt={ this.state.user.first_name + " " + this.state.user.last_name }
                                                    className="rounded-circle"
                                                />

                                                <span className="ml-2 text-light">{ this.state.user.first_name + " " + this.state.user.last_name }</span>
                                            </div>
                                            <div className="col-2">
                                                <div className="text-right text-secondary small">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="dropdown-menu" aria-labelledby="dashboard-profile-dropdown">
                                        <a href="/" className="dropdown-item">Settings</a>
                                        <a href="/" className="dropdown-item">Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="dashboard-content-container">
                        <Switch>
                            <Route exact path="/dashboard/">
                                <Notifications />
                            </Route>

                            <Route exact path="/dashboard/messages">
                                <Messages />
                            </Route>

                            <Route exact path="/dashboard/cars">
                                <Cars />
                            </Route>

                            <Route exact path="/dashboard/rentals">
                                <Rentals />
                            </Route>

                            <Route exact path="/dashboard/cars/add">
                                <AddCar />
                            </Route>

                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Dashboard;