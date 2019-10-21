/**
 * WebRouter route the URL
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import CarList from '../CarList';
import CarView from '../CarView';

class WebRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/register" component={ Register } />
                <Route path="/dashboard" component={ Dashboard } />
                <Route exact path="/cars" component={ CarList } />
                <Route path="/cars/:carId" component={ CarView } />
            </BrowserRouter>
        );
    }
}

export default WebRouter;