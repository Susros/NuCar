/**
 * Register page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SimpleNavBar from './components/navbar/SimpleNavbar';
import DarkContainer from './containers/DarkContainer';

class Register extends Component {
    
    render() {
        return(
            <DarkContainer>
                <div className="py-3">
                    <SimpleNavBar />
                </div>

                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-6">
                            <div className="bg-white text-dark p-3 roundedr">
                                <div className="form-group border-bottom">
                                    <h4 className="text-center">Create New Account</h4>
                                </div>

                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col">
                                            <input type="text" name="first_name" className="form-control" placeholder="First Name" id="first-name-input" required />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="col">
                                            <input type="text" name="last_name" className="form-control" placeholder="Last Name" id="last-name-input" required />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email" id="email-input" required />
                                    <div className="invalid-feedback"></div>
                                </div>

                                <div class="form-group">
                                    <input type="password" name="password" className="form-control" placeholder="Password" id="password-input" required />
                                    <div className="invalid-feedback"></div>
                                </div>

                                <div class="form-group">
                                    <input type="password" name="password_confirmation" className="form-control" placeholder="Confirm Password" id="password-confirm-input" required />
                                </div>

                                <div class="form-group">
                                    <p className="small text-secondary">
                                        By clicking Register, you agree to our <Link to="/">Terms</Link>, <Link to="/">Data Policy</Link> and <Link to="/">Cookies Policy</Link>.
                                    </p>
                                </div>

                                <div className="form-group">
                                    <input type="submit" value="Register" className="btn btn-success w-50 btn-lg" id="register-btn" />
                                </div>

                                <div className="form-group">
                                    Already a member? <Link to="/login">Login here.</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DarkContainer>
        );
    }

}

export default Register;