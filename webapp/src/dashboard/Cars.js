/**
 * List all owner's cars
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import temporary_car_image from '../img/temporary_car_image.jpg';

import CarDetailsRow from './templates/CarDetailsRow';

class Cars extends Component {

    /**
     * Constructor for Notifications
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            cars: [],
            isloading: true
        }
    }

    /**
     * After componen is mounted
     * 
     * Get all cars 
     */
    componentDidMount() {
        
        // Remove all active in the dashboard nav
        Array.from(document.getElementsByClassName("dashboard-nav-item")).forEach(el => {
            el.classList.remove("active");
        });

        document.getElementById("dashboard-nav-cars").classList.add("active");

        // Get list of cars
        axios.get(
            process.env.REACT_APP_API_URL + '/users/cars', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                withCredentials: true
            }
        ).then(({ data }) => {
            this.setState({ cars: data.data, isloading: false });
        }).catch(err => {
            this.setState({ isloading: false });
        });
    }

    render() {

        if (this.state.isloading) {
            return null;
        }

        return(
            <div>
                <nav className="navbar navbar-light bg-light border-bottom">
                    <b>Cars</b>

                    <div>
                        <Link to="/dashboard/cars/add" className="btn btn-success btn-sm">
                            <i className="fas fa-plus small"></i>
                            <span className="ml-1">Add Car</span>
                        </Link>
                    </div>
                </nav>

                <div className="container">
                    <div className="py-3">
                        <div className="row">
                            <div className="col-8">

                            </div>

                            <div className="col-4">
                                <form>
                                    <div className="input-group">
                                        <input type="text" name="search" className="form-control border-right-0" id="search-input" placeholder="Search" />

                                        <div className="input-group-append">
                                            <div className="input-group-text bg-white border-left-0">
                                                <i className="fas fa-search"></i>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr className="bg-light">
                                    <th scope="col"></th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Price (AUD)</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>

                                { 
                                    this.state.cars.map( (car, num) => 
                                        <CarDetailsRow 
                                            num={ num }
                                            title={ car.make + " " + car.model }
                                            price={ car.price }
                                            status={ car.status }
                                            transmission={ car.transmission }
                                            img={ temporary_car_image }
                                            id={ car.id }
                                            numSeat={ car.num_seat }
                                        />
                                    )
                                
                                }

                            </tbody>
                        </table>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><Link className="page-link" to="/dashboard/cars/?start=0">Previous</Link></li>
                                <li className="page-item"><Link className="page-link" to="/dashboard/cars/?start=1">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="/dashboard/cars/?start=2">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="/dashboard/cars/?start=3">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="/dashboard/cars/?start=4">Next</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cars;