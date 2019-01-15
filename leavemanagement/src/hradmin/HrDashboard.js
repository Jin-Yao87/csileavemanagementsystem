import React, { Component } from 'react';
import SideBar from './SideBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import StaffProfileComponent from '../staffprofile/StaffProfileComponent';
import { Container, Row, Col } from 'reactstrap';

class HrDashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs="2">
                        <SideBar />
                    </Col>
                    <Col xs="10">
                        <Switch >
                            <Route exact path="/hrdashboard" title="List Staff Profile" component={StaffProfileComponent} />
                        </Switch>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default HrDashboard;