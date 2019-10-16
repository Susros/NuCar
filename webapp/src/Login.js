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
                            <div className="bg-white text-dark p-3 rounded text-center">
                                <div className="form-group border-bottom">
                                    <h4>Login</h4>
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