/**
 * Table row that showing car details
 * 
 * @author Kelvin Yin
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarDetailsRow extends Component {

    /**
     * Constructor for CarDetailsRow
     * 
     * @param {Object} props Component properties
     */
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <tr>
                <td className="align-middle" scope="row">{ this.props.num }</td>
                <td className="align-middle">
                    <img 
                        src={ this.props.img }
                        width="100"
                        alt={ this.props.title }
                    />
                </td>

                <td className="align-middle">
                    <ul className="list-unstyled">
                        <li><h6 className="font-weight-bolder">{ this.props.title }</h6></li>
                        <li>Transmission: { this.props.transmission }</li>
                        <li>Number of Seat: { this.props.numSeat }</li>
                    </ul>
                </td>

                <td className="align-middle">
                    ${ this.props.price } / hr
                </td>

                <td className="align-middle">
                    {
                        (this.props.status === 'available') ? 
                        <span className="badge badge-success">Available</span> : 
                        <span className="badge badge-danger">Unavailable</span>
                    }
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
        );
    }

}

export default CarDetailsRow;