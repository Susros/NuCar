/**
 * List all owner's cars
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import temporary_car_image from '../img/temporary_car_image.jpg';

function CarDetailsRow(props) {
    return(
        <tr>
            <td className="align-middle" scope="row">{ props.num }</td>
            <td className="align-middle">
                <img 
                    src={ props.img }
                    width="100"
                    alt={ props.title }
                />
            </td>

            <td className="align-middle">
                <ul className="list-unstyled">
                    <li><h6 className="font-weight-bolder">{ props.title }</h6></li>
                    <li>Transmission: { props.transmission }</li>
                    <li>Number of Seat: { props.numSeat }</li>
                </ul>
            </td>

            <td className="align-middle">
                ${ props.price } / hr
            </td>

            <td className="align-middle">
                {
                    (props.status === 'available') ? 
                    <span className="badge badge-success">Available</span> : 
                    <span className="badge badge-danger">Unavailable</span>
                }
            </td>

            <td className="align-middle text-right">
                <Link to="/" className="btn btn-primary btn-sm mr-2">
                    <i className="fas fa-eye small mr-1"></i> View
                </Link>

                <a href="#" className="btn btn-success btn-sm" data-toggle="modal" data-target={ "#car-view-modal-" + props.id }>
                    <i className="fas fa-undo"></i> Return
                </a>

                <div className="modal fade" id={ "car-view-modal-" + props.id } tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{ props.title }</h5>
                            </div>

                            <div className="modal-body text-left">
                                
                                <p>
                                    Confirming to return the car.
                                </p>

                                <form onSubmit={ props.handleReturn }>
                                    <input type="hidden" name="rental_id" value={ props.rental_id } />

                                    <div className="form-group">
                                        <button type="button" className="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                                        <input type="submit" value="Return" className="btn btn-success" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </td>
        </tr>
    );
}

class Rentals extends Component {

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
            process.env.REACT_APP_API_URL + '/users/rentals', {
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

    /**
     * Handle return car
     * 
     * @param {Object} event
     */
    returnCar = event => {
        event.preventDefault();
        
        const id = parseInt(event.target.rental_id.value);

        // Return car
        axios.post(
            process.env.REACT_APP_API_URL + '/cars/rental/' + id + '/return',
            {
                rental_id : id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        ).then(res => {
            window.location.href="/dashboard/rentals";
        }).catch(err => {
            console.log(err);
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
                        <a href="/cars" className="btn btn-secondary btn-sm">
                            <span className="ml-1">Browse Cars</span>
                        </a>
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
                                            key={ car.id }
                                            num={ num + 1 }
                                            title={ car.make + " " + car.model }
                                            price={ car.price }
                                            status={ car.status }
                                            transmission={ car.transmission }
                                            img={ temporary_car_image }
                                            id={ car.id }
                                            numSeat={ car.num_seat }
                                            rental_id={ car.rental_id }
                                            handleReturn= { this.returnCar }
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

export default withRouter(Rentals);