/**
 * CarForm template for adding and editing car information.
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

class CarForm extends Component {
    
    /**
     * Constructor for CarForm
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <form>
                <div className="form-row my-3">
                    <div className="col">
                        <div class="form-group">
                            <label for="make-input" className="font-weight-bolder">Make</label>
                            <input type="text" name="make" className="form-control" id="make-input" placeholder="Enter car make" required />
                        </div>
                    </div>

                    <div className="col">
                        <div class="form-group">
                            <label for="model-input" className="font-weight-bolder">Model</label>
                            <input type="text" name="model" className="form-control" id="model-input" placeholder="Enter car model" required />
                        </div>
                    </div>

                    <div className="col">
                        <div class="form-group">
                            <label for="transmission-input" className="font-weight-bolder">Transmission</label>
                            <select className="custom-select" name="transmission" id="transmission-input">
                                <option disabled="disabled" selected="true">Select Transmission</option>
                                <option value="automatic">Automatic</option>
                                <option value="manuel">Manuel</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-row my-3">
                    <div className="col">
                        <div class="form-group">
                            <label for="num-seat-input" className="font-weight-bolder">Number of Seats</label>
                            <input type="number" name="number_of_seats" className="form-control" id="num-seat-input" placeholder="Enter number of seats" required />
                        </div>
                    </div>

                    <div className="col">
                        <div class="form-group">
                            <label for="rego-input" className="font-weight-bolder">Registration Number</label>
                            <input type="text" name="registration_number" className="form-control" id="rego-input" placeholder="Enter car registration number" required />
                        </div>
                    </div>

                    <div className="col">
                        <div class="form-group">
                            <label for="last-service-input" className="font-weight-bolder">Last Service</label>
                            <input type="date" name="last_service" className="form-control" id="last-service-input" required />
                        </div>
                    </div>
                </div>

                <div className="form-row my-3">
                    <div className="col">
                        <div class="form-group">
                            <label for="available-from-input" className="font-weight-bolder">Available from</label>
                            <input type="date" name="available_from" className="form-control" id="available-from-input" required />
                        </div>
                    </div>

                    <div className="col">
                        <div class="form-group">
                            <label for="available-to-input" className="font-weight-bolder">Available to</label>
                            <input type="date" name="available_to" className="form-control" id="available-to-input" required />
                        </div>
                    </div>

                    <div className="col">
                        <div class="form-group">
                            <label for="price-input" className="font-weight-bolder">Price (per hour)</label>
                            <input type="number" name="price" min="0" step="0.01" className="form-control" id="price-input" required />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label for="address-input" className="font-weight-bolder">Address</label>
                    <input type="text" name="address" className="form-control" id="address-input" placeholder="Car Location" required />
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
                    <select className="custom-select" id="status-input" name="status">
                        <option value="available">Available</option>
                        <option value="rented"></option>
                    </select>
                </div>

                <hr />
                    
                <div className="form-group">
                    <input type="submit" value="Save Car" className="btn btn-success" />
                </div>

            </form>
        );
    }
}

export default CarForm;