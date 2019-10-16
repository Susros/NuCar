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
                            <div className="bg-white text-dark p-3 rounded text-center">
                                <div className="form-group border-bottom">
                                    <h4>Create New Account</h4>
                                </div>

                                

                                <div className="form-group text-left">
                                    <input type="submit" value="Register" className="btn btn-success w-50 btn-lg" id="login-btn" />
                                </div>

                                <div className="form-group text-left">
                                    <Link to="/login">Already a member? Login here.</Link>
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