/**
 * WebRouter route the URL
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../App';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';

class WebRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={ App } />
                <Route path="/login" component={ Login } />
                <Route path="/register" component={ Register } />
                <Route path="/dashboard" component={ Dashboard } />
            </BrowserRouter>
        );
    }
}

export default WebRouter;