/** 
 * SimpleNavBar is the navbar that has only logo in the middle.
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import h_logo_light from '../../img/h_logo_light.png';

class SimpleNavBar extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark sticky-top">
                <Link className="navbar-brand mx-auto" to="/">
                    <img src={ h_logo_light } height="65" title="NuCar" alt="NuCar"/>
                </Link>
            </nav>
        );
    }
}

export default SimpleNavBar;