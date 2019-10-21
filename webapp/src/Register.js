/**
 * Register page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import SimpleNavBar from './components/navbar/SimpleNavbar';
import DarkContainer from './containers/DarkContainer';

class Register extends Component {
    
    /**
     * Constructor for register component
     * 
     * @param {Object} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                first_name            : '',
                last_name             : '',
                email                 : '',
                password              : '',
                confirm_password      : '',
                ethereum_address      : '',
                ethereum_private_key  : '',
                user_type             : ''
            },

            isloggedin: false,
            isloading: true
        }
    }

    /**
     * After component is mounted
     */
    componentDidMount() {
        axios.get(
            process.env.REACT_APP_API_URL + '/users/login/check', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            this.setState({ isloggedin: true, isloading: false });
        }).catch(err => {
            this.setState({ isloggedin: false, isloading: false });
        });
    }

    /**
     * Update inputs state when filling up the input fields
     * 
     * @param {Object} event Input field event
     */
    handleInputChange = event => {
        const { value, name } = event.target;

        const{ inputs } = { ...this.state };

        inputs[name] = value;

        this.setState({ inputs })
    }

    /**
     * Handle form submit
     * 
     * @param {Object} event Form event
     */
    onSubmit = event => {
        event.preventDefault();

        var btn = document.getElementById('register-btn');
        btn.setAttribute("disabled", "disabled");
        btn.nextElementSibling.classList.remove('d-none');

        axios.post(
            process.env.REACT_APP_API_URL + '/users/register',
            this.state.inputs,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                
                withCredentials: true
            }
        ).then(res => {
            this.props.history.push('/dashboard');
            this.setState({ isloggedin: true });
        }).catch(err => {
            btn.removeAttribute("disabled");
            btn.nextElementSibling.classList.add('d-none');

            // Remove all invalid feedback
            var invalidFormControl = document.getElementsByClassName('form-control is-invalid');
            while(invalidFormControl[0]) {
                invalidFormControl[0].classList.remove('is-invalid');
            }

            err.response.data.errors.forEach(error => {
                document.getElementsByName(error.field)[0].classList.add('is-invalid');
                document.getElementsByName(error.field)[0].nextSibling.innerHTML = error.message;
            });
        });
    }

    render() {

        if (this.state.isloading) {
            return null;
        }

        if (this.state.isloggedin) {
            return <Redirect to="/dashboard" />
        }

        return(
            <DarkContainer>
                <div className="py-3">
                    <SimpleNavBar />
                </div>

                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-6">
                            <div className="bg-white text-dark p-3 rounded">
                                <form onSubmit={ this.onSubmit }>
                                    <div className="form-group border-bottom">
                                        <h4 className="text-center">Create New Account</h4>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <input type="text" name="first_name" className="form-control" placeholder="First Name" id="first-name-input" onChange={ this.handleInputChange } required />
                                                <div className="invalid-feedback"></div>
                                            </div>
                                            <div className="col">
                                                <input type="text" name="last_name" className="form-control" placeholder="Last Name" id="last-name-input" onChange={ this.handleInputChange } required />
                                                <div className="invalid-feedback"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <input type="email" name="email" className="form-control" placeholder="Email" id="email-input" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" placeholder="Password" id="password-input" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>

                                    <div className="form-group">
                                        <input type="password" name="confirm_password" className="form-control" placeholder="Confirm Password" id="password-confirm-input" onChange={ this.handleInputChange } required />
                                    </div>

                                    <div className="form-row">
                                        <div className="col-6">
                                            <div className="custom-control custom-radio">
                                                <input type="radio" id="user-type-owner-input" name="user_type" value="owner" className="custom-control-input" onChange={ this.handleInputChange } required />
                                                <label className="custom-control-label" for="user-type-owner-input">I'm listing my car</label>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="custom-control custom-radio">
                                                <input type="radio" id="user-type-borrower-input" name="user_type" value="borrower" className="custom-control-input" onChange={ this.handleInputChange } />
                                                <label className="custom-control-label" for="user-type-borrower-input">I'm borrowing a car</label>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <h6>Ethereum Account</h6>

                                    <div className="form-group">
                                        <input type="text" name="ethereum_address" className="form-control" placeholder="Ethereum Account Address" id="eth-account-input" onChange={ this.handleInputChange } require />
                                        <div className="invalid-feedback"></div>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" name="ethereum_private_key" className="form-control" placeholder="Ethereum Account Private Key" id="eth-private-key-input" onChange={ this.handleInputChange } require />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                    
                                    <hr />

                                    <div className="form-group">
                                        <p className="small text-secondary">
                                            By clicking Register, you agree to our <Link to="/">Terms</Link>, <Link to="/">Data Policy</Link> and <Link to="/">Cookies Policy</Link>.
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Register" className="btn btn-success w-50 btn-lg" id="register-btn" />

                                        <div className="spinner-grow align-middle text-success ml-3 d-none" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        Already a member? <Link to="/login">Login here.</Link>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-3 text-muted text-center">
                                <small>Copyright &copy; 2019 NuCar &bull; Developed by Kelvin Yin</small>
                            </div>
                        </div>
                    </div>
                </div>
            </DarkContainer>
        );
    }

}

export default Register;