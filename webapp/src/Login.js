/**
 * Login Page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import SimpleNavBar from './components/navbar/SimpleNavbar';
import DarkContainer from './containers/DarkContainer';
import axios from 'axios';

class Login extends Component {

    /**
     * Constructor for Login component
     * 
     * @param {Object} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                email    : '',
                password : ''
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

        var btn = document.getElementById('login-btn');
        btn.setAttribute("disabled", "disabled");
        btn.nextElementSibling.classList.remove('d-none');

        axios.post(
            process.env.REACT_APP_API_URL + '/users/login',
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
                        <div className="col-md-6">
                            <div className="bg-white text-dark p-3 rounded">
                                <div className="form-group border-bottom">
                                    <h4 className="text-center">Login</h4>
                                </div>

                                <form onSubmit={ this.onSubmit }>
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
                                                onChange={ this.handleInputChange }
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
                                                onChange={ this.handleInputChange }
                                                required
                                            />

                                            <div className="invalid-feedback"></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Login" className="btn btn-primary w-50 btn-lg" id="login-btn" />

                                        <div className="spinner-grow align-middle text-primary ml-3 d-none" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    

                                    <div className="form-group">
                                        <Link to="/">Forgot your password?</Link>
                                    </div>

                                    <div className="form-group">
                                        Not a member yet? <Link to="/register">Sign up here.</Link>
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

export default Login;