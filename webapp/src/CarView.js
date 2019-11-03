/**
 * Car View page
 * 
 * This page is for viewing the individual car information and 
 * booking the car
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import AppNavbar from './components/navbar/AppNavbar';

import temporary_car_image from './img/temporary_car_image.jpg';

import 'react-datepicker/dist/react-datepicker.css';

function ucwords(str) {
    return (str + '')
    .replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase()
    })
}

function formatDate(date) {
    let d = new Date(date);
    return d.getDate() + "/" + parseInt(d.getMonth() + 1) + "/" + d.getFullYear();
}

class CarView extends Component {

    /**
     * Cosntructor for CarView
     * @param {Object} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            car: null,
            isloading: true,
            carId: 0,
            booking: {
                pickup_date: new Date(),
                return_date: (new Date()).setDate((new Date()).getDate() + 1)
            }
        }
    }

    /** 
     * After component is loaded
     */
    componentDidMount() {
        const carId = this.props.match.params.carId;

        // Get individual car
        axios.get(
            process.env.REACT_APP_API_URL + '/cars/' + carId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                withCredentials: true
            }
        ).then(({ data }) => {
            this.setState({ car: data.data, isloading: false });
        }).catch(err => {
            this.setState({ isloading: false });
        });
    }

    bookCar = (event) => {
        event.preventDefault();

        const carId = this.props.match.params.carId;

        var btn = document.getElementById('book-btn');
        btn.setAttribute("disabled", "disabled");

        axios.post(
            process.env.REACT_APP_API_URL + '/cars/' + carId + '/book',
            {
                car_id: carId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            this.props.history.push('/dashboard/rentals');
        }).catch(err => {

            btn.removeAttribute('disabled');

            document.getElementById('error-display').classList.remove('d-none');
            document.getElementById('error-display').innerHTML = "There is an error.";
            console.log(err);
        });
    }

    render() {

        if (this.state.isloading) {
            return null;
        }

        if (this.state.car == null) {
            return (
                <div className="alert alert-danger"><h1>404</h1></div>
            );
        }

        return(
            <div>
                <AppNavbar />

                <div className="container my-3">
                    <div className="row">
                        <div className="col-7 border-right">
                            <img
                                src={ temporary_car_image }
                                className="w-100"
                                alt={ this.state.car.make + " " + this.state.car.model }
                            />

                            <div className="my-3 p-3 border-top border-bottom d-flex justify-content-between">
                                <span><b>{ this.state.car.num_booking }</b> Bookings</span>
                                <span>&bull;</span>

                                <span>{ this.state.car.num_seat } Seats</span>
                                <span>&bull;</span>

                                <span>{ ucwords(this.state.car.transmission) }</span>
                            </div>

                            <div className="my-3">
                                <h5>Description</h5>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>

                            <hr />

                            <div className="my-3">
                                <h5>Features</h5>

                                <div className="row">
                                    <div className="col-4">
                                        <i className="fas fa-check text-success"></i> Air Conditioning
                                    </div>

                                    <div className="col-4">
                                        <i className="fas fa-check text-success"></i> GPS
                                    </div>

                                    <div className="col-4">
                                        <i className="fas fa-check text-success"></i> Child Seat
                                    </div>

                                    <div className="col-4">
                                        <i className="fas fa-check text-success"></i> FM/AM Radio
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="my-3">
                                <h5>Availability</h5>

                                <p>This car is available from { formatDate(this.state.car.available_from) } - { formatDate(this.state.car.available_to) }</p>
                            </div>

                            <hr />

                            <div className="my-3">
                                <h5>Reviews</h5>

                                <div className="jumbotron">
                                    <h1 className="display-4">Review Section</h1>
                                    <p>
                                        Users are able to read reviews and leave feedbacks in this section.
                                    </p>
                                </div>
                            </div>

                            <hr />

                            <div className="my-3">
                                <h5>Map</h5>

                                <div className="jumbotron">
                                    <h1 className="display-4">Google Map</h1>
                                    <p>
                                        This section shows the location of the car using Google Map API
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="col-5">
                            <h2>{ this.state.car.make + " " + this.state.car.model }</h2>
                            <p><i className="fas fa-map-marker-alt"></i> { this.state.car.address }</p>

                            <hr />

                            <h5>Book this car</h5>

                            <form onSubmit={ this.bookCar }>
                                <div className="form-row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label for="pickup-date-input">Pickup Date</label>
                                            <DatePicker 
                                                selected={ this.state.booking.pickup_date } 
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control" 
                                                id="pickup-date-input" 
                                                name="pickup_date" 
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-group">
                                            <label for="return-date-input">Return Date</label>
                                            <DatePicker 
                                                selected={ this.state.booking.return_date } 
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control" 
                                                id="return-date-input" 
                                                name="return_date" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                { /* <div className="alert alert-danger">This car is not available withing this time frame.</div> */ }

                                <hr />

                                <div className="form-group">
                                    <div className="form-row align-items-center">
                                        <div className="col-6">
                                            <b className="h2">${ this.state.car.price }</b><sub className="lead"> / hour</sub>
                                        </div>

                                        <div className="col-6">
                                            <input type="submit" value="Book" className="btn btn-primary btn-lg w-100" id="book-btn" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="alert alert-danger d-none" role="alert" id="error-display"></div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CarView;