import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";

class MyProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div>
                <div className="container">
                    <ListGroup style={ divStyle }>
                        <ListGroupItem color="primary">My Profile</ListGroupItem>
                        <ListGroupItem>CSI Staff ID: </ListGroupItem>
                        <ListGroupItem>Name: Shahrul Ridzuan Aliyas</ListGroupItem>
                        <ListGroupItem>Email: </ListGroupItem>
                        <ListGroupItem>IC No./ Passport No.: </ListGroupItem>
                        <ListGroupItem>Job Title: </ListGroupItem>
                        <ListGroupItem>Mobile No.: </ListGroupItem>
                        <ListGroupItem>Business Unit: </ListGroupItem>
                        <ListGroupItem>Line Manager: </ListGroupItem>
                        <ListGroupItem>Join Date: </ListGroupItem>
                    </ListGroup>
                    <br />
                    <Button color="primary" tag={Link} to="/changepassword" activeclassname="active">Change Password</Button>
                </div>
                <br />
            </div>
        );


    }
}

export default MyProfile;