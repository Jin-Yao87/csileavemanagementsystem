import React, { Component } from 'react';
import { Table, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";

class LeaveEntitlement extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const spacing = {
            padding: "10px",
            textAlign: "right"
        }

        const divStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div className="container">
                <div style={spacing}>
                    <Button className="btn btn-primary" color="primary" tag={Link} to="/addnewleave" activeclassname="active">Add New</Button>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>CSI Staff ID</th>
                            <th>Staff Name</th>
                            <th>Leave Year</th>
                            <th>Leave Code</th>
                            <th>Carried Forward</th>
                            <th>Entitlement</th>
                            <th>Available Leave</th>
                            <th>Taken Leave</th>
                            <th>Balance Leave</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Button color="primary"><span>Edit</span></Button></td>
                            <td><Button color="primary"><span>Delete</span></Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default LeaveEntitlement;