/**
 * Login Page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SimpleNavBar from './components/navbar/SimpleNavbar';
import DarkContainer from './containers/DarkContainer';

class Login extends Component {
    render() {
        return(
            <DarkContainer>
                <div className="py-3">
                    <SimpleNavBar />
                </div>

                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-6">
                            <div className="bg-white text-dark p-3 rounded">
                                <div className="form-group border-bottom">
                                    <h4 className="text-center">Login</h4>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-prepend">
                                            <span className="input-group-text" id="email-input-addon">
                                                <i className="fas fa-at"></i>
                                            </span>
                                        </span>

                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="form-control" 
                                            aria-label="Email" 
                                            aria-describedby="email-input-addon"
                                            placeholder="Email"
                                            id="email-input"
                                            required
                                        />

                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-prepend">
                                            <span className="input-group-text" id="password-input-addon">
                                                <i className="fas fa-key"></i>
                                            </span>
                                        </span>

                                        <input 
                                            type="password" 
                                            name="password" 
                                            className="form-control" 
                                            aria-label="Password" 
                                            aria-describedby="password-input-addon"
                                            placeholder="Password"
                                            id="password-input"
                                            required
                                        />

                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn btn-primary w-50 btn-lg" id="login-btn" />
                                </div>

                                <div className="form-group">
                                    <Link to="/">Forgot your password?</Link>
                                </div>

                                <div className="form-group">
                                    Not a member yet? <Link to="/register">Sign up here.</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DarkContainer>  
        );
    }
}

export default Login;