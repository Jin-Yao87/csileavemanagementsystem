import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";
import ManagerSideBar from "./ManagerSideBar";
import "../common/Styles.css";

class ManagerApproval extends Component {
  render() {
    const headerStyle = {
      margin: "0 0 0 10px"
    };

    return (
      <Col>
        <Row>
          <Col md="1.5">
            <ManagerSideBar />
          </Col>
          <Col xs className="content">
            <div className="headerContainerFlex">
              <span className="header">
                <h3 style={headerStyle}>View Leave Request</h3>
              </span>
            </div>
            <br />
            <div className="tableContainerFlex">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Leave Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
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

export default ManagerApproval;
