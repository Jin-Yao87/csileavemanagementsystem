import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ChangePassword extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          };
        return (
            <div className="container" style={ divStyle }>
                <Form>
                    <FormGroup>
                        <Label for="currentPassword">Current Password</Label>
                        <Input type="password" name="currentpassword" id="passcurrentpassword" placeholder="Current Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Change Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Change Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                    </FormGroup>
                    <br />
                    <Button color="primary">Submit</Button><span>  </span>
                    <Button color="primary">Show Password</Button>
                </Form>
            </div>
        );
    }
}

export default ChangePassword;