import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Col
} from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { fetchData, isHrRole } from "../util/APIUtils";
import { API_BASE_URL } from "../constants";
import { confirmAlert } from "react-confirm-alert";
import "../common/Styles.css";
import XLSX from "xlsx";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExcelUploadTemplate from "../templates/LeaveEntitlement.xlsx";

class UploadEntitlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entitlementData: [],
      employeeProfiles: [],
      leaveCategories: [],
      filename: "",
      isValid: false,
      loading: false
    };
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.loadEmployeeProfilesLookup();
    this.loadLeaveCategoriesLookup();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadEmployeeProfilesLookup = () => {
    fetchData({
      url: API_BASE_URL + "/employeedetails",
      method: "GET"
    })
      .then(data => this.setState({ employeeProfiles: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  loadLeaveCategoriesLookup = () => {
    fetchData({
      url: API_BASE_URL + "/leavecategories",
      method: "GET"
    })
      .then(data => this.setState({ leaveCategories: data }))
      .catch(error => {
        if (error.status === 401) {
          this.props.history.push("/login");
        } else {
          confirmAlert({
            message: error.status + " : " + error.message,
            buttons: [
              {
                label: "OK"
              }
            ]
          });
        }
      });
  };

  handleExcelFileUpload = file => {
    if (file.target.files[0]) {
      if (!file.target.files[0].name.match(/.(xls|xlsx)$/i)) {
        return confirmAlert({
          message:
            "Invalid Template has been used for uploading Leave Entitlement! Please use the latest Upload Template available in this page...",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    }
    if (this._isMounted && file.target.files[0]) {
      /* Update state values for filename and loading */
      this.setState({
        filename: file.target.value,
        loading: true
      });
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = e => {
        /* Parse Entitlement Data */
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get the second worksheet */
        const worksheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[worksheetName];
        /* Convert array of arrays to JSON */
        const uploadData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        /* Update State's Entitlement Data */
        this.setState({
          entitlementData: uploadData,
          loading: true
        });
        this.validateUploadedRowsData();
      };
      if (rABS) reader.readAsBinaryString(file.target.files[0]);
      else reader.readAsArrayBuffer(file.target.files[0]);
    } else {
      this.setState({
        entitlementData: [],
        filename: "",
        isValid: false,
        loading: false
      });
    }
  };

  validateUploadedRowsData = () => {
    let employeeProfilesData = this.state.employeeProfiles;
    let leaveCategoriesData = this.state.leaveCategories;
    let updatedEntitlementData = this.state.entitlementData.filter(
      entRow =>
        entRow.EmployeeID &&
        typeof entRow.LeaveYear === "number" &&
        ("" + entRow.LeaveYear).length === 4 &&
        entRow.LeaveType &&
        typeof entRow.CarriedForward === "number" &&
        typeof entRow.Entitlement === "number" &&
        typeof entRow.AvailableLeave === "number" &&
        typeof entRow.TakenLeave === "number" &&
        typeof entRow.BalanceLeave === "number" &&
        employeeProfilesData.some(empProf => {
          return empProf.emplId === entRow.EmployeeID;
        }) &&
        leaveCategoriesData.some(leave => {
          return leave.leaveCode === entRow.LeaveType;
        })
    );

    if (
      this.state.entitlementData.length === 0 ||
      (this.state.entitlementData.length && updatedEntitlementData.length === 0)
    ) {
      this.setState({
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "No rows have been uploaded! Please verify that you are using the correct template and that it contains Leave Entitlement data...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else if (
      this.state.entitlementData.length !== updatedEntitlementData.length
    ) {
      const arrInvalidRows = this.getRowsWithErrors(
        this.state.entitlementData,
        updatedEntitlementData
      );
      this.setState({
        entitlementData: arrInvalidRows,
        isValid: false,
        loading: false
      });
      confirmAlert({
        message:
          "Invalid row(s) has/have been found from the uploaded Leave Entitlement data! Please find those invalid row(s) in the table and fix them in Excel Template, then re-try uploading...",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    } else {
      this.setState({
        entitlementData: updatedEntitlementData,
        isValid: true,
        loading: false
      });
    }
  };

  getRowsWithErrors = (arrAll, arrValidated) => {
    const arrDiff = [];
    arrAll.forEach(arrAllRow => {
      let arrAllIsPresentInArrVal = arrValidated.some(
        arrValRow =>
          arrValRow.EmployeeID === arrAllRow.EmployeeID &&
          arrValRow.LeaveYear === arrAllRow.LeaveYear &&
          arrValRow.LeaveType === arrAllRow.LeaveType &&
          arrValRow.CarriedForward === arrAllRow.CarriedForward &&
          arrValRow.Entitlement === arrAllRow.Entitlement &&
          arrValRow.AvailableLeave === arrAllRow.AvailableLeave &&
          arrValRow.TakenLeave === arrAllRow.TakenLeave &&
          arrValRow.BalanceLeave === arrAllRow.BalanceLeave
      );
      if (!arrAllIsPresentInArrVal) {
        arrDiff.push(arrAllRow);
      }
    });
    return arrDiff;
  };

  confirmEntitlementSave = e => {
    confirmAlert({
      message: "Do you really want to save all uploaded Entitlements?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleEntitlementSave(e)
        },
        {
          label: "No"
        }
      ]
    });
  };

  handleEntitlementSave = e => {
    // This is a temporary solution for saving Array of data, an API
    // for saving bulk of data should be created to speed up the saving
    this.state.entitlementData.map(entRow => {
      const jsonRowValues = {
        id: {
          emplid: entRow.EmployeeID,
          year: entRow.LeaveYear,
          leaveCode: entRow.LeaveType
        },
        employeeDetails: {
          emplId: entRow.EmployeeID
        },
        leaveCategory: {
          leaveCode: entRow.LeaveType
        },
        carryForward: entRow.CarriedForward,
        entitlement: entRow.Entitlement,
        availableLeave: entRow.AvailableLeave,
        takenLeave: entRow.TakenLeave,
        balanceLeave: entRow.BalanceLeave
      };

      const postRequest = Object.assign({}, jsonRowValues);
      fetchData({
        url: API_BASE_URL + "/leaveentitlement",
        method: "POST",
        body: JSON.stringify(postRequest)
      })
        .then(response => {
          // if (response.ok) {
          //   confirmAlert({
          //     message: "Entitlement has been successfully inserted!",
          //     buttons: [
          //       {
          //         label: "OK",
          //         onClick: () => this.props.history.push("/leaveentitlement")
          //       }
          //     ]
          //   });
          // }
        })
        .catch(error => {
          if (error.status === 401) {
            this.props.history.push("/login");
          } else {
            confirmAlert({
              message: error.status + " : " + error.message,
              buttons: [
                {
                  label: "OK"
                }
              ]
            });
          }
        });
    });
    this.props.history.push("/leaveentitlement");
  };

  completedEntitlementSave = e => {
    confirmAlert({
      message:
        "All Leave Entitlements have been successfully saved to the Database!",
      buttons: [
        {
          label: "OK",
          onClick: () => this.props.history.push("/leaveentitlement")
        }
      ]
    });
  };

  validateStateHasData = () => {
    const isInvalid = !this.state.entitlementData.length || !this.state.isValid;
    return isInvalid;
  };

  handleReset = () => {
    this.setState({
      entitlementData: [],
      filename: "",
      isValid: false,
      loading: false
    });
  };

  handleCancelUpload = () => {
    this.props.history.push("/leaveentitlement");
  };

  render() {
    if (!isHrRole(this.props.currentUser)) {
      return <Redirect to="/forbidden" />;
    }

    console.log("State", this.state);
    const leaveEntitlementCols = [
      {
        id: "emplId",
        Header: "Employee ID",
        accessor: "EmployeeID",
        width: 110,
        sortable: true,
        filterable: true
      },
      {
        id: "year",
        Header: "Leave Year",
        accessor: "LeaveYear",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "leaveType",
        Header: "Leave Type",
        accessor: "LeaveType",
        // minWidth: 180,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "carryForward",
        Header: "Carried Forward",
        accessor: "CarriedForward",
        minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "entitlement",
        Header: "Entitlement",
        accessor: "Entitlement",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "availableLeave",
        Header: "Available Leave",
        accessor: "AvailableLeave",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "takenLeave",
        Header: "Taken Leave",
        accessor: "TakenLeave",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      },
      {
        id: "balanceLeave",
        Header: "Balance Leave",
        accessor: "BalanceLeave",
        // minWidth: 120,
        sortable: true,
        filterable: true,
        style: {
          textAlign: "center"
        }
      }
    ];

    return (
      <div className="mainContainerFlex">
        <div className="headerContainerFlex">
          <span className="header">
            <h3 className="headerStyle">Upload Leave Entitlements</h3>
          </span>
        </div>
        <div className="reactTableContainer">
          <Form>
            <div>
              <FormGroup
                row
                style={{
                  fontFamily: "Helvetica",
                  size: "16",
                  fontWeight: "bold"
                }}
              >
                <Label for="excelFileName" sm={2}>
                  Upload Excel File:
                </Label>

                <Col sm={{ size: 6 }}>
                  <Input
                    type="file"
                    name="filename"
                    id="filename"
                    accept=".xls,.xlsx"
                    value={this.state.filename}
                    onChange={this.handleExcelFileUpload.bind(this)}
                    style={{
                      background: "#b8e2fc",
                      border: "1px solid rgb(214, 209, 209)"
                    }}
                  />
                  <FormText color="muted" style={{ fontFamily: "Helvetica" }}>
                    Please download the latest{" "}
                    <a href={ExcelUploadTemplate}>
                      Leave Entitlement Upload Template
                    </a>{" "}
                    for you to fill in the data.
                  </FormText>
                </Col>
                <Col sm={4} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={event => this.confirmEntitlementSave(event)}
                    disabled={this.validateStateHasData()}
                    style={{ width: "100px" }}
                    className="largeButtonOverride"
                  >
                    Save
                  </Button>
                  <span> </span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                    style={{ width: "100px" }}
                    className="largeButtonOverride"
                  >
                    Reset
                  </Button>
                  <span> </span>
                  <Button
                    color="secondary"
                    width="80px"
                    onClick={this.handleCancelUpload}
                  >
                    Back to Main
                  </Button>
                </Col>
              </FormGroup>
            </div>
            <ReactTable
              data={this.state.entitlementData}
              columns={leaveEntitlementCols}
              defaultPageSize={10}
              pages={this.state.pages}
              loading={this.state.loading}
              filterable={true}
              sortable={true}
              multiSort={true}
              loadingText="Loading Leave Entitlements..."
              noDataText="No data available."
              className="-striped"
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadEntitlement);
