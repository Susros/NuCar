/**
 * List all owner's cars
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';

class Cars extends Component {

    /**
     * Constructor for Notifications
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Remove all active in the dashboard nav
        Array.from(document.getElementsByClassName("dashboard-nav-item")).forEach(el => {
            el.classList.remove("active");
        });

        document.getElementById("dashboard-nav-cars").classList.add("active");
    }

    render() {
        return(
            <div>
                <nav className="navbar navbar-light bg-light border-bottom">
                    <b>Notifications</b>
                </nav>
            </div>
        );
    }
}

export default Cars;