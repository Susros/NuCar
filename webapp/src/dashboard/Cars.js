/**
 * List all owner's cars
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                                <tr>
                                    <td className="align-middle" scope="row">1</td>
                                    <td className="align-middle">
                                        <img 
                                            src="https://cnd2.imgix.net/members/vehicles/photos/000/018/706/original/SUM50V.jpg?ixlib=rails-3.0.2&w=2618"
                                            width="100"
                                            alt=""
                                            title=""
                                        />
                                    </td>

                                    <td className="align-middle">
                                        <ul className="list-unstyled">
                                            <li><h6 className="font-weight-bolder">Toyota Corolla (2008)</h6></li>
                                            <li>Transmission: Automatic</li>
                                            <li>Number of Seat: 5</li>
                                        </ul>
                                    </td>

                                    <td className="align-middle">
                                        $10 / hr
                                    </td>

                                    <td className="align-middle">
                                        <span className="badge badge-success">Available</span>
                                    </td>

                                    <td className="align-middle text-right">
                                        <Link to="/" className="btn btn-primary btn-sm mr-2">
                                            <i className="fas fa-eye small mr-1"></i> View
                                        </Link>

                                        <Link to="/" className="btn btn-success btn-sm">
                                            <i className="fas fa-pen small mr-1"></i> Edit
                                        </Link>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="align-middle" scope="row">1</td>
                                    <td className="align-middle">
                                        <img 
                                            src="https://cnd2.imgix.net/members/vehicles/photos/000/018/706/original/SUM50V.jpg?ixlib=rails-3.0.2&w=2618"
                                            width="100"
                                            alt=""
                                            title=""
                                        />
                                    </td>

                                    <td className="align-middle">
                                        <ul className="list-unstyled">
                                            <li><h6 className="font-weight-bolder">Toyota Corolla (2008)</h6></li>
                                            <li>Transmission: Automatic</li>
                                            <li>Number of Seat: 5</li>
                                        </ul>
                                    </td>

                                    <td className="align-middle">
                                        $10 / hr
                                    </td>

                                    <td className="align-middle">
                                        <span className="badge badge-success">Available</span>
                                    </td>

                                    <td className="align-middle text-right">
                                        <Link to="/" className="btn btn-primary btn-sm mr-2">
                                            <i className="fas fa-eye small mr-1"></i> View
                                        </Link>

                                        <Link to="/" className="btn btn-success btn-sm">
                                            <i className="fas fa-pen small mr-1"></i> Edit
                                        </Link>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="align-middle" scope="row">1</td>
                                    <td className="align-middle">
                                        <img 
                                            src="https://cnd2.imgix.net/members/vehicles/photos/000/018/706/original/SUM50V.jpg?ixlib=rails-3.0.2&w=2618"
                                            width="100"
                                            alt=""
                                            title=""
                                        />
                                    </td>

                                    <td className="align-middle">
                                        <ul className="list-unstyled">
                                            <li><h6 className="font-weight-bolder">Toyota Corolla (2008)</h6></li>
                                            <li>Transmission: Automatic</li>
                                            <li>Number of Seat: 5</li>
                                        </ul>
                                    </td>

                                    <td className="align-middle">
                                        $10 / hr
                                    </td>

                                    <td className="align-middle">
                                        <span className="badge badge-danger">Rented</span>
                                    </td>

                                    <td className="align-middle text-right">
                                        <Link to="/" className="btn btn-primary btn-sm mr-2">
                                            <i className="fas fa-eye small mr-1"></i> View
                                        </Link>

                                        <Link to="/" className="btn btn-success btn-sm">
                                            <i className="fas fa-pen small mr-1"></i> Edit
                                        </Link>
                                    </td>
                                </tr>
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