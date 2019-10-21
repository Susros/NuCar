/**
 * Home page
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DarkContainer from './containers/DarkContainer'

import v_logo_light from './img/v_logo_light.png';

class Home extends Component {

    render() {
        return(
            <DarkContainer>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">

                            <div className="text-center my-5">
                                <img
                                    src={ v_logo_light }
                                    width="130"
                                    alt="NuCar"
                                />

                                <div className="mt-5">

                                    <h1 className="font-weight-light">Blockchain Based Car Share Network</h1>

                                    <div className="row pt-5">
                                        <div className="col-md">
                                            <Link to="/login" title="Login" className="btn btn-outline-light w-100">Login</Link>
                                        </div>

                                        <div className="col-md">
                                            <Link to="/register" title="Register" className="btn btn-success w-100">Register</Link>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="input-group input-group-lg">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white border-right-0">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </span>
                                            </div>

                                            <input type="text" value="" className="form-control border-left-0" />

                                            <div className="input-group-append">
                                                <Link to="/cars" title="Browse cars" className="btn btn-light bg-white">Browse</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 text-muted">
                                    <small>Copyright &copy; 2019 NuCar &bull; Developed by Kelvin Yin</small>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </DarkContainer>
        );
    }

}

export default Home;