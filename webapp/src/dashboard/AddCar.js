/**
 * Add Car page
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

class AddCar extends Component {

    /**
     * Constructor for Notifications
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            transmission: '',
            num_seat: '',
            rego: '',
            price: '',
            address: '',
            status: 'available',
            last_service: '',
            available_from: '',
            available_to: ''
        }
    }

    /**
     * After component is loaded
     */
    componentDidMount() {
        // Remove all active in the dashboard nav
        Array.from(document.getElementsByClassName("dashboard-nav-item")).forEach(el => {
            el.classList.remove("active");
        });

        document.getElementById("dashboard-nav-cars").classList.add("active");
    }

    /**
     * Handle changes of input
     * 
     * @param {Object} event
     */
    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState(
            {
                [name] : value
            }
        );
    }

    /**
     * Handle form submit
     * 
     * @param {Object} event
     */
    onSubmit = (event) => {
        event.preventDefault();

        var btn = document.getElementById('save-btn');
        btn.setAttribute("disabled", "disabled");
        btn.nextElementSibling.classList.remove('d-none');

        axios.post(
            process.env.REACT_APP_API_URL + '/cars/add',
            this.state,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            this.props.history.push('/dashboard/cars');
        }).catch(err => {
            btn.removeAttribute("disabled");
            btn.nextElementSibling.classList.add('d-none');

            document.getElementById('error-display').classList.remove('d-none');
            document.getElementById('error-display').innerHTML = "There is an error.";
            console.log(err);
        });

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

                        <div className="alert alert-danger d-none" id="error-display" role="alert"></div>

                        <form onSubmit={ this.onSubmit }>
                            <div className="form-row my-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label for="make-input" className="font-weight-bolder">Make</label>
                                        <input type="text" name="make" className="form-control" id="make-input" placeholder="Enter car make" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label for="model-input" className="font-weight-bolder">Model</label>
                                        <input type="text" name="model" className="form-control" id="model-input" placeholder="Enter car model" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label for="transmission-input" className="font-weight-bolder">Transmission</label>
                                        <select className="custom-select" name="transmission" id="transmission-input" onChange={ this.handleInputChange } required>
                                            <option disabled="disabled" selected="true">Select Transmission</option>
                                            <option value="automatic">Automatic</option>
                                            <option value="manual">Manual</option>
                                        </select>
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row my-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label for="num-seat-input" className="font-weight-bolder">Number of Seats</label>
                                        <input type="number" name="num_seat" className="form-control" id="num-seat-input" placeholder="Enter number of seats" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label for="rego-input" className="font-weight-bolder">Registration Number</label>
                                        <input type="text" name="rego" className="form-control" id="rego-input" placeholder="Enter car registration number" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label for="last-service-input" className="font-weight-bolder">Last Service</label>
                                        <input type="date" name="last_service" className="form-control" id="last-service-input" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row my-3">
                                <div className="col">
                                    <div className="form-group">
                                        <label for="available-from-input" className="font-weight-bolder">Available from</label>
                                        <input type="date" name="available_from" className="form-control" id="available-from-input" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label for="available-to-input" className="font-weight-bolder">Available to</label>
                                        <input type="date" name="available_to" className="form-control" id="available-to-input" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label for="price-input" className="font-weight-bolder">Price (per hour)</label>
                                        <input type="number" name="price" min="0" step="0.01" className="form-control" id="price-input" onChange={ this.handleInputChange } required />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="address-input" className="font-weight-bolder">Address</label>
                                <input type="text" name="address" className="form-control" id="address-input" placeholder="Car Location" onChange={ this.handleInputChange } required />
                                <div className="invalid-feedback"></div>
                            </div>

                            <div className="form-group">
                                <label for="description-input" className="font-weight-bolder">Description</label>
                                <Editor
                                    initialValue=""
                                    apiKey="eifby809xjp8h1rbeqbwbajj2z35jxeugl3w9n7xe5lm43c0"
                                    init={
                                        {
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help'
                                        }
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label className="font-weight-bolder">Features</label>

                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-aircon-input" />
                                                <label className="custom-control-label" for="feature-aircon-input">Air Conditioning</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-keyless-entry-input" />
                                                <label className="custom-control-label" for="feature-keyless-entry-input">Keyless Entry</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-rearcam-input" />
                                                <label className="custom-control-label" for="feature-rearcam-input">Rear Camera</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-satnav-input" />
                                                <label className="custom-control-label" for="feature-satnav-input">Satellite Navigation</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-radio-input" />
                                                <label className="custom-control-label" for="feature-radio-input">AM/FM Radio</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-cdplayer-input" />
                                                <label className="custom-control-label" for="feature-cdplayer-input">CD Player</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-bluetooth-input" />
                                                <label className="custom-control-label" for="feature-bluetooth-input">Bluetooth Audio System</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="feature-childseat-input" />
                                                <label className="custom-control-label" for="feature-childseat-input">Child Seat</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group w-50">
                                <label for="status-input">Status</label>
                                <select className="custom-select" id="status-input" name="status" onChange={ this.handleInputChange } required>
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                                <div className="invalid-feedback"></div>
                            </div>

                            <hr />
                                
                            <div className="form-group">
                                <input type="submit" value="Save Car" className="btn btn-success" id="save-btn" />
                                
                                <div className="spinner-grow align-middle text-primary ml-3 d-none" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddCar);