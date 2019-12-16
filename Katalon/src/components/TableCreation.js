import React, { Component, Fragment } from "react";
import Rowbyrow from "./Rowbyrow";
import "../styles/TableCSS.css";
import { array } from "prop-types";
import RunScript from "./RunScript";

class TableCreation extends Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
    this.globalHandler = this.globalHandler.bind(this);
    this.userId_environment = this.userId_environment.bind(this);

    this.state = {
      rows: 1,
      data: [
        {
          action: "",
          action_name: "",
          variable: "",
          value: ""
        }
      ],
      user_id: "",
      environment: ""
    };
  }

  addRow = data => {
    let newrow = data + 1;
    let newRows = [];

    newRows.push({
      action: "",
      action_name: "",
      variable: "",
      value: ""
    });

    this.setState({
      rows: newrow,
      data: [...this.state.data, ...newRows]
    });
  };

  removeRow = data => {
    let newrow = data > 1 ? data - 1 : data;
    let arrayDataState = "";

    if (this.state.data.length >= 2) {
      arrayDataState = this.state.data;
      arrayDataState.pop();
    }

    this.setState({
      data: arrayDataState,
      rows: newrow
    });
  };

  addRemoveButtons() {
    return (
      <div id="addRemoveButtons" className="col-md-4 offset-md-1">
        <button type="button" onClick={() => this.addRow(this.state.rows)}>
          <span className="icon-plus-circle2" />
        </button>
        <button type="button" onClick={() => this.removeRow(this.state.rows)}>
          <span className="icon-minus-circle2" />
        </button>
      </div>
    );
  }

  userId_environment() {
    return (
      <div className="row">
        <div className="col-md-12 user-id">
          <label className="label-user-id">User ID:</label>
          <input
            type="text"
            name="environment"
            value={this.state.user_id}
            onChange={this.handleChangeID}
            style={{ width: "10%", marginRight: "20px" }}
            placeholder="NXF00000"
          />
          <label className="label-user-id">Environment:</label>
          <select
            name="environment"
            id={"environment_selector"}
            style={{ width: "10%", fontSize: "11px" }}
            onChange={this.handleChangeEnvironment}
          >
            <option value="" selected>
              Select
            </option>
            <option value="uat">UAT</option>
            <option value="prod">Production</option>
          </select>
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
            </tr>
          </thead>
          <tbody id="tbody">
            <Rowbyrow
              rows={this.state.rows}
              globalHandler={this.globalHandler}
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
