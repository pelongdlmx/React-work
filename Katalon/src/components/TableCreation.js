import React, { Component, Fragment } from "react";
import Rowbyrow from "./Rowbyrow";
import "../styles/TableCSS.css";
import { array } from "prop-types";
import RunScript from "./RunScript";
import Swal from "sweetalert2";

class TableCreation extends Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
    this.globalHandler = this.globalHandler.bind(this);
    this.userId_environment = this.userId_environment.bind(this);

    this.state = {
      rows: 3,
      data: [
        {
          action: "",
          action_name: "",
          variable: "",
          value: "",
          url: ""
        },
        {
          action: "",
          action_name: "",
          variable: "",
          value: "",
          url: ""
        },
        {
          action: "",
          action_name: "",
          variable: "",
          value: "",
          url: ""
        }
      ],
      user_id: "",
      environment: ""
    };
  }

  addRow(data) {
    let newrow = data + 1;
    let newRows = [];

    newRows.push({
      action: "",
      action_name: "",
      variable: "",
      value: "",
      url: ""
    });

    this.setState({
      rows: newrow,
      data: [...this.state.data, ...newRows]
    });
  }

  removeRow(data) {
    let newrow = data > 1 ? data - 1 : data;
    let arrayDataState = this.state.data.length;
    if (data > 1) {
      Swal.fire({
        text: `Are you sure want to remove the line # ${arrayDataState}?`,
        title: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.setState({
            rows: newrow
          });
          this.removeData(this.state.data);
        }
      });
    }
  }

  removeData(data) {
    if (data.length > 1) {
      let arrayDataState = data;
      arrayDataState.pop();
      this.setState({
        data: arrayDataState
      });
    }
  }

  addRemoveButtons() {
    return (
      <div id="addRemoveButtons" className="col-md-4 offset-md-1">
        <span
          type="button"
          className="btn btn-outline-dark icon-plus-circle2"
          onClick={() => this.addRow(this.state.rows)}
        ></span>
        <span
          type="button"
          className="btn btn-outline-dark icon-minus-circle2"
          onClick={() => this.removeRow(this.state.rows)}
        ></span>
      </div>
    );
  }

  userId_environment() {
    return (
      <div className="col-md-12 user-id">
        <div className="form-row">
          <div className="form-group col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  User ID:
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="environment"
                value={this.state.user_id}
                onChange={this.handleChangeID}
                placeholder="NXF00000"
              />
            </div>
          </div>
          <div className="form-group col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Environment:
                </span>
              </div>
              <select
                className="form-control"
                name="environment"
                id={"environment_selector"}
                onChange={this.handleChangeEnvironment}
              >
                <option value="" defaultValue>
                  Select
                </option>
                <option value="uat">UAT</option>
                <option value="prod">Production</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeID(event) {
    let user_id = event.target.value.toUpperCase();
    this.setState({ user_id: user_id });
  }

  handleChangeEnvironment(event) {
    this.setState({ environment: event.target.value });
  }

  globalHandler(event, type, level) {
    let masterData = this.state.data;
    if (level > 0) {
      this.setState({
        data: masterData.map((data, key) =>
          key === level - 1 ? { ...data, [type]: event } : data
        )
      });
    }
  }

  render() {
    return (
      <Fragment>
        {this.userId_environment()}
        <table className="table table-striped table-hover table-responsive-sm">
          <thead className="thead-dark centered">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Action</th>
              <th scope="col">Action Name</th>
              <th scope="col">Variable</th>
              <th scope="col">Value</th>
              <th scope="col">URL (only for New Actions)</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <Rowbyrow
              rows={this.state.rows}
              globalHandler={this.globalHandler}
              flag={this.state.data}
            />
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-12" style={{ display: "inline-flex" }}>
            {this.addRemoveButtons()}
            <RunScript data={this.state} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TableCreation;
