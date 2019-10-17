/**
 * Add Car page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CarForm from './templates/CarForm';

class AddCar extends Component {

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
                    <b>Cars</b>

                    <div>
                        <ol className="breadcrumb bg-light m-0 p-0">
                            <li className="breadcrumb-item"><Link to="/dashboard/cars" title="Cars">Cars</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Add Car</li>
                        </ol>
                    </div>
                </nav>

                <div className="container mt-3">
                    <div className="w-75 mx-auto">
                        <div className="py-3 border-bottom">
                            <h3>Add Car</h3>
                        </div>
                        <CarForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCar;