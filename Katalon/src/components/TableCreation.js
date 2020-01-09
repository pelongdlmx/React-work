import React, { Component, Fragment } from "react";
import Rowbyrow from "./Rowbyrow";
import "../styles/TableCSS.css";
import { array } from "prop-types";
import RunScript from "./RunScript";
import Swal from "sweetalert2";
import LoadScript from "./LoadScript";

class TableCreation extends Component {
  constructor(props) {
    super(props);

    this.addRow = this.addRow.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
    this.globalHandler = this.globalHandler.bind(this);
    this.userId_environment = this.userId_environment.bind(this);
    this.handleFileChosen = this.handleFileChosen.bind(this);
    // this.splitDataLoaded = this.splitDataLoaded.bind(this);

    this.state = {
      importedData: "",
      loaded: false,
      rows: 3,
      edited: false,
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

  handleFileChosen(file) {
    let newArray = file.split(/(?:\\[rn]|[\r\n]+)+/g);
    newArray.map((data, key) => {
      data === "" ? newArray.splice(key, 1) : null;
    });

    let importedData = [];
    let user_id = "";
    let environment = "";
    let rows = newArray.length;
    let invalidFile = false;

    newArray.forEach(function(data) {
      environment = data.indexOf("_DATA_TEST") != -1 ? "uat" : "prod";
      let actionType =
        data.indexOf("INSERT INTO") != -1
          ? "new"
          : data.indexOf("UPDATE") != -1
          ? "update"
          : data.indexOf("DELETE FROM") != -1
          ? "remove"
          : "invalid";

      switch (actionType) {
        case "new":
          let newCase = data.split("(");
          let dataToWork = newCase[2].replace(/\'/g, "").split(",");
          user_id = dataToWork[6];
          importedData.push({
            action: "new",
            action_name: dataToWork[1].replace(/\s/g, ""),
            variable: dataToWork[2].replace(/\s/g, ""),
            value: dataToWork[3].replace(/\s/g, ""),
            url: dataToWork[0].replace(/\s/g, "")
          });
          break;
        case "update":
          let updateCase = data
            .substring(data.lastIndexOf("SET") + 4, data.lastIndexOf(";"))
            .split(/\'/g);

          user_id = updateCase[3].replace(/\'/g, "").replace(";", "");
          importedData.push({
            action: "update",
            action_name: updateCase[5].replace(/\'/g, ""),
            variable: updateCase[7].replace(/\'/g, "").replace(";", ""),
            value: updateCase[1].replace(/\'/g, "").replace(",", ""),
            url: ""
          });

          break;
        case "remove":
          let removeCase = data
            .substring(data.lastIndexOf("WHERE") + 4, data.lastIndexOf(";"))
            .split(/\'/g);

          importedData.push({
            action: "remove",
            action_name: removeCase[1].replace(/\'/g, ""),
            variable: removeCase[3].replace(/\'/g, "").replace(";", ""),
            value: "",
            url: ""
          });
          break;
        case "invalid":
          invalidFile = true;
          break;
      }
    });

    if (invalidFile) {
      Swal.fire({
        title: "Error!",
        text: "Invalidad file format. Cannot load file",
        icon: "error",
        confirmButtonText: "OK"
      });
    } else {
      this.setState({
        rows: rows,
        user_id: user_id.replace(/\s/g, "").replace(",", ""),
        environment: environment,
        importedData: file,
        data: importedData,
        loaded: true,
        edited: true
      });
    }
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
                <option value="uat" selected={this.state.environment === "uat"}>
                  UAT
                </option>
                <option
                  value="prod"
                  selected={this.state.environment === "prod"}
                >
                  Production
                </option>
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
        ),
        edited: true
      });
    }
  }

  render() {
    this.state.loaded ? console.log("cargando archivo") : null;
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
              globalState={this.state}
              flag={this.state.data}
            />
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-12" style={{ display: "inline-flex" }}>
            {this.addRemoveButtons()}
            <RunScript data={this.state} />
          </div>
          <LoadScript
            mainState={this.state}
            handleFileChosen={file => this.handleFileChosen(file)}
          />
        </div>
      </Fragment>
    );
  }
}

export default TableCreation;
