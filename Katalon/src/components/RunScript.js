import React, { Component, Fragment } from "react";

class RunScript extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text_cases: {
        new: [
          "INSERT INTO ",
          "(URL, ACTION_NAME, VARIABLE, VALUE, CREATE_DTE, LAST_UPDATE_DTE, LAST_UPDATE_USERID, CREATE_USERID) VALUES (",
          "); ",
          "'",
          ", ",
          "SYSDATE"
        ],
        update: [
          "UPDATE ",
          " SET",
          " value = '",
          "last_update_userid = '",
          "last_update_dte = sysdate WHERE action_name = '",
          " AND variable = '",
          "; "
        ],
        remove: ["DELETE FROM ", " WHERE action_name = '", "'", "; "]
      },
      environment: {
        uat: ["ANALYTICS_VALIDATION_DATA_TEST "],
        prod: ["ANALYTICS_VALIDATION_DATA "]
      },
      fail: ["Please, introduce: ", "Is missing information in the line #"]
    };
  }

  validations(data) {
    let allData = data;
    if (allData.data.user_id === "") {
      this.missingData("User ID");
    } else if (allData.data.environment === "") {
      this.missingData("Environment");
    } else {
      let infoList = this.props.data;
      let errorList = [];

      infoList.data.map((info, key) => {
        if (
          info.action === "" ||
          info.action_name === "" ||
          info.variable === "" ||
          info.value === ""
        ) {
          errorList.push(key + 1);
        }
      });
      if (errorList.length > 0) {
        this.missingData(null, errorList);
      } else {
        this.createScript(infoList);
      }
    }
  }

  missingData(component, key) {
    key === undefined
      ? alert(`${this.state.fail[0]}${component}`)
      : alert(`${this.state.fail[1]}${key}`);
  }

  createScript(infoList) {
    let environment = this.state.environment[infoList.environment][0];

    let script = "";
    let sqlScript = infoList.data.map((info, key) => {
      switch (info.action) {
        case "new":
          script += `${this.state.text_cases.new[0] +
            environment +
            this.state.text_cases.new[1] +
            this.state.text_cases.new[3] +
            info.url +
            this.state.text_cases.new[3] +
            ", " +
            this.state.text_cases.new[3] +
            info.action_name +
            this.state.text_cases.new[3] +
            ", " +
            this.state.text_cases.new[3] +
            info.variable +
            this.state.text_cases.new[3] +
            ", " +
            this.state.text_cases.new[3] +
            info.value +
            this.state.text_cases.new[3] +
            ", " +
            this.state.text_cases.new[5] +
            ", " +
            this.state.text_cases.new[5] +
            ", " +
            this.state.text_cases.new[3] +
            infoList.user_id +
            this.state.text_cases.new[3] +
            ", " +
            this.state.text_cases.new[3] +
            infoList.user_id +
            this.state.text_cases.new[3] +
            this.state.text_cases.new[2]}`;
          break;
        case "update":
          console.log("inside switch", info.action);
          break;
        case "remove":
          console.log("inside switch", info.action);
          break;
      }
    });
    console.log("sqlScript", script);
  }

  render() {
    return (
      <Fragment>
        <div id="createScript" className="col-md-4 offset-md-3">
          <button type="button" onClick={() => this.validations(this.props)}>
            Create Script
          </button>
        </div>
      </Fragment>
    );
  }
}

export default RunScript;
