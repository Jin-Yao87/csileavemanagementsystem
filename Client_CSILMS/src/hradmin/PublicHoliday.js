import React, { Component } from "react";
import { Button, Table, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import "../common/Styles.css";

class PublicHoliday extends Component {
  render() {
    return (
      <Col>
        <Row>
          <Col md="1.5">
            <SideBar />
          </Col>
          <Col xs className="content">
            <div className="headerContainerFlex">
              <span className="header">
                <h3 className="headerStyle">Public Holiday</h3>
              </span>
            </div>
            <br />
            <div className="tableContainerFlex">
              <div style={{ textAlign: "right" }}>
                <Button
                  className="btn btn-primary"
                  color="primary"
                  tag={Link}
                  to="/addpublicholiday"
                  activeclassname="active"
                >
                  Add New
                </Button>
                <span> </span>
                <Button className="btn btn-primary" color="primary">
                  Upload Holiday
                </Button>
                <br />
                <br />
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
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <Button
                        className="btn btn-primary"
                        color="primary"
                        tag={Link}
                        to="/editpublicholiday"
                        activeclassname="active"
                      >
                        <span>Edit</span>
                      </Button>
                    </td>
                    <td>
                      <Button color="primary">
                        <span>Delete</span>
                      </Button>
                    </td>
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

export default PublicHoliday;
