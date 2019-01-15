import React, { Component } from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class PublicHoliday extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const spacing = {
            padding: "10px",
            textAlign: "right"
        }

        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <div>
                <br />
                <div className="container" style={divStyle}>
                    <Row>
                        <Col><h3>List of Public Holiday</h3></Col>
                    </Row>
                </div>
                <br />
                <div className="container">
                    <div style={spacing}>
                        <Button className="btn btn-primary" color="primary" tag={Link} to="/addpublicholiday" activeclassname="active">Add New</Button>
                    </div>

                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Holiday</th>
                                <th>State</th>
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
                                <td><Button color="primary"><span>Edit</span></Button></td>
                                <td><Button color="primary"><span>Delete</span></Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default PublicHoliday;