import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../common/Styles.css";
import { Redirect, withRouter } from 'react-router-dom';
import { isHrRole } from '../util/APIUtils';
import { API_BASE_URL } from '../constants';
import ReactTable from "react-table";
import { fetchData, formatDateDMY } from "../util/APIUtils";

class PublicHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicHolidayDetails: []
    };
    this.loadPublicHolidayDetails = this.loadPublicHolidayDetails.bind(this);
  }

  loadPublicHolidayDetails() {
    fetchData({
      url: API_BASE_URL + "/publicholidays",
      method: 'GET'
    }).then(data => {
      //console.log("Results:", data);
      this.setState({
        publicHolidayDetails: data
      });
    }).catch(error => {
      if (error.status === 401) {
        this.props.history.push("/login");
      }
      let userData = [];
      this.setState({ userData: userData });
      console.log(userData);
    });
  }

  componentDidMount() {
    this.loadPublicHolidayDetails();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadPublicHolidayDetails();
    }
  }

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return (<Redirect to='/forbidden' />);
    }

    const PublicHolidayCols = [
      {
        id: "holidayDate",
        Header: "Date",
        accessor: d => formatDateDMY(d.holidayDate),
        width: 100,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayDay",
        Header: "Day",
        accessor: "holidayDay",
        minWidth: 60,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayDescr",
        Header: "Holiday",
        accessor: "holidayDescr",
        minWidth: 130,
        sortable: true,
        filterable: true
      },
      {
        id: "holidayState",
        Header: "State",
        accessor: "holidayState",
        minWidth: 290,
        sortable: true,
        filterable: true
      },
      {
        id: "editAction",
        Header: "Edit",
        accessor: editButton => (
          <Button
            size="sm"
            tag={Link}
            to={`/publicholiday/edit/${formatDateDMY(editButton.holidayDate)}`}
            className="smallButtonOverride"
          >
            <span className="fa fa-edit" /> Edit
          </Button>
        ),
        minWidth: 40,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "deleteAction",
        Header: "Delete",
        accessor: deleteButton => (
          <Button
            size="sm"
            className="smallButtonOverride"
          >
            <span className="fa fa-trash" /> Delete
          </Button>
        ),
        minWidth: 40,
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Public Holiday</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Row style={{ height: "50px" }}>
            <Col md="6" xs="6">
              <Button
                tag={Link}
                to={`#`}
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-upload"
                  style={{ margin: "0px 10px 0px 0px" }}
                />
                Upload Holiday
            </Button>
            </Col>
            <Col md="6" xs="6" style={{ textAlign: "right" }}>
              <Button
                tag={Link}
                to={`/publicholiday/add`}
                className="largeButtonOverride"
              >
                <span
                  className="fa fa-plus"
                  style={{ margin: "0px 5px 0px 0px" }}
                />
                Add Holiday
              </Button>
            </Col>
          </Row>
          <ReactTable
            data={this.state.publicHolidayDetails}
            columns={PublicHolidayCols}
            defaultPageSize={10}
            pages={this.state.pages}
            filterable={true}
            sortable={true}
            multiSort={true}
            noDataText="No data available."
            className="-striped"
          >
          </ReactTable>
        </div>
      </div >
    );
  }
}

export default withRouter(PublicHoliday);
