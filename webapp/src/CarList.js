/**
 * Car List page
 * 
 * This page list all available cars to rent.
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppNavbar from './components/navbar/AppNavbar';

import temporary_car_image from './img/temporary_car_image.jpg';

class CarList extends Component {

    /**
     * Constructor for CarList
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <AppNavbar />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 border-right bg-light">
                            <div className="p-3">
                                <h3 className="mb-4">Filter</h3>

                                <form>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white border-right-0">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </span>
                                            </div>

                                            <input type="text" name="location" className="form-control border-left-0" id="location-input" placeholder="Location" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-6">
                                            <input type="date" name="pickup_date" className="form-control" id="pickup-date-input" />
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group">
                                                <input type="date" name="return_date" className="form-control" id="return-date-input" />
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="form-group">
                                        <label className="font-weight-bold">Transmission</label>
                                        
                                        <div className="form-row">
                                            <div className="col-6">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="transmission-auto-input" />
                                                    <label className="custom-control-label" for="transmission-auto-input">Automatic</label>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="transmission-manual-input" />
                                                    <label className="custom-control-label" for="transmission-manual-input">Manual</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="form-group">
                                        <label className="font-weight-bold">Type</label>
                                        
                                        <div className="form-row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-convertible-input" />
                                                        <label className="custom-control-label" for="type-convertible-input">Convertible</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-seden-input" />
                                                        <label className="custom-control-label" for="type-seden-input">Seden</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-hatch-input" />
                                                        <label className="custom-control-label" for="type-hatch-input">Hatch Back</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-suv-input" />
                                                        <label className="custom-control-label" for="type-suv-input">SUV</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-ute-input" />
                                                        <label className="custom-control-label" for="type-ute-input">Ute</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-van-input" />
                                                        <label className="custom-control-label" for="type-van-input">Van</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="type-wagon-input" />
                                                        <label className="custom-control-label" for="type-wagon-input">Wagon</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="form-group">
                                        <label className="font-weight-bold">Features</label>

                                        <div className="form-row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-aircon-input" />
                                                        <label className="custom-control-label" for="feature-aircon-input">Air Conditioning</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-keyless-entry-input" />
                                                        <label className="custom-control-label" for="feature-keyless-entry-input">Keyless Entry</label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-rearcam-input" />
                                                        <label className="custom-control-label" for="feature-rearcam-input">Rear Camera</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-gps-input" />
                                                        <label className="custom-control-label" for="feature-gps-input">GPS </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-radio-input" />
                                                        <label className="custom-control-label" for="feature-radio-input">AM/FM Radio</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-cdplayer-input" />
                                                        <label className="custom-control-label" for="feature-cdplayer-input">CD Player</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-bluetooth-input" />
                                                        <label className="custom-control-label" for="feature-bluetooth-input">Bluetooth Audio System</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="feature-childseat-input" />
                                                        <label className="custom-control-label" for="feature-childseat-input">Child Seat</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Apply Filter" className="btn btn-success" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="py-3 border-bottom">
                                <small>
                                    Showing <b>20</b> cars near Newcastle.
                                </small>
                            </div>

                            <div>
                                <div className="row my-3">
                                    <div className="col-md-4">
                                        <img 
                                            src={ temporary_car_image }
                                            className="w-100"
                                            title=""
                                            alt=""
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <h5>Toyota Corolla 2008</h5>
                                        <small><i className="fas fa-map-marker-alt"></i> Waratah, NSW 2298</small>

                                        <div className="row text-center mt-4 border-top border-bottom py-3 bg-light">
                                            <div className="col-4">
                                                <span className="lead font-weight-bold">10</span>
                                                <div className="text-muted">
                                                    <i className="fas fa-clipboard-check mr-1"></i> Bookings
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <span className="lead font-weight-bold">20</span>
                                                <div className="text-success">
                                                    <i className="fas fa-thumbs-up mr-1"></i> Likes
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <span className="lead font-weight-bold">5</span>
                                                <div className="text-danger">
                                                    <i className="fas fa-thumbs-down mr-1"></i> Dislikes
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 text-center align-self-center">
                                        <div className="my-3">
                                            <sup className="lead">$</sup><span className="h2">29.44</span> <sub className="lead text-muted">/ hr</sub>
                                        </div>

                                        <div className="my-3">
                                            <Link to="/" className="btn btn-info w-100">Book</Link>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="row my-3">
                                    <div className="col-md-4">
                                        <img 
                                            src={ temporary_car_image }
                                            className="w-100"
                                            title=""
                                            alt=""
                                        />
                                    </div>

                                    <div className="col-md-5">
                                        <h5>Toyota Corolla 2008</h5>
                                        <small><i className="fas fa-map-marker-alt"></i> Waratah, NSW 2298</small>

                                        <div className="row text-center mt-4 border-top border-bottom py-3 bg-light">
                                            <div className="col-4">
                                                <span className="lead font-weight-bold">10</span>
                                                <div className="text-muted">
                                                    <i className="fas fa-clipboard-check mr-1"></i> Bookings
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <span className="lead font-weight-bold">20</span>
                                                <div className="text-success">
                                                    <i className="fas fa-thumbs-up mr-1"></i> Likes
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <span className="lead font-weight-bold">5</span>
                                                <div className="text-danger">
                                                    <i className="fas fa-thumbs-down mr-1"></i> Dislikes
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 text-center align-self-center">
                                        <div className="my-3">
                                            <sup className="lead">$</sup><span className="h2">29.44</span> <sub className="lead text-muted">/ hr</sub>
                                        </div>

                                        <div className="my-3">
                                            <Link to="/" className="btn btn-info w-100">Book</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CarList;