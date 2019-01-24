import React, { Component } from 'react';
import { Button, Table, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import SideBar from './SideBar';
import "../common/Styles.css"

class LeaveCategory extends Component {

    render() {
        const headerStyle = {
            margin: "0 0 0 10px"
        };

        const divStyle = {
            background: "#B8E2FC",
            width: "auto",
            margin: "0 0 0 0",
            padding: "25px 0 25px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };

        return (
            <Col >
            <Row>
                <Col md="1.5">
                    <SideBar />
                </Col>
                <Col md="10" xs="8" className="content">
                    <br />
                    <div style={divStyle}>
                        <span className="header"><h3 style={headerStyle}>List of Leave Category</h3></span>
                        </div><br />
                        <div className="ContainerFlex">
                            <div style={{ textAlign: "right" }}>
                                <Button className="btn btn-primary" color="primary" tag={Link} to="/addleavecategory" activeclassname="active">Add New</Button><br /><br />
                            </div>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Leave Code</th>
                                        <th>Description</th>
                                        <th>Entitlement</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><Button color="primary" tag={Link} to="/editleavecategory" activeclassname="active"><span>Edit</span></Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default LeaveCategory;