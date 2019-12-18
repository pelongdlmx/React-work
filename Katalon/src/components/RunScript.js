import React, { Component, Fragment } from "react";
import Swal from "sweetalert2";

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
          "SET value = '",
          "'",
          "last_update_userid = '",
          "last_update_dte = sysdate WHERE action_name = '",
          "' AND variable = '",
          "'; "
        ],
        remove: [
          "DELETE FROM ",
          "WHERE action_name = '",
          "' AND variable = '",
          "'; "
        ]
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
          info.value === "" ||
          info.action === "new"
            ? info.url === ""
            : null
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
    Swal.fire({
      title: "Error!",
      text:
        key === undefined
          ? `${this.state.fail[0]}${component}`
          : `${this.state.fail[1]}${key}`,
      icon: "error",
      confirmButtonText: "Got it! "
    });
  }

  createScript(infoList) {
    let environment = this.state.environment[infoList.environment][0];

    let script = "";
    let sqlScript = infoList.data.map((info, key) => {
      switch (info.action) {
        case "new":
          script +=
            `${this.state.text_cases.new[0] +
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
              this.state.text_cases.new[2] +
              "\n\r"}` + "\n\r";
          break;
        case "update":
          script +=
            `${this.state.text_cases.update[0] +
              environment +
              this.state.text_cases.update[1] +
              info.value +
              this.state.text_cases.update[2] +
              ", " +
              this.state.text_cases.update[3] +
              infoList.user_id +
              this.state.text_cases.update[2] +
              ", " +
              this.state.text_cases.update[4] +
              info.action_name +
              this.state.text_cases.update[5] +
              info.variable +
              this.state.text_cases.update[6] +
              "\n\r"}` + "\n\r";
          break;
        case "remove":
          script +=
            `${this.state.text_cases.remove[0] +
              environment +
              this.state.text_cases.remove[1] +
              info.action_name +
              this.state.text_cases.remove[2] +
              info.variable +
              this.state.text_cases.remove[3] +
              "\n\r"}` + "\n\r";
          break;
      }
    });
    const date = new Date().toISOString();
    const element = document.createElement("a");
    const file = new Blob([script], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = `${date}.sql`;
    document.body.appendChild(element);
    element.click();
  }

  render() {
    return (
      <Fragment>
        <div id="createScript" className="col-md-4 offset-md-3">
          <span
            type="button"
            className="btn btn-success"
            onClick={() => this.validations(this.props)}
          >
            Create Script
          </span>
        </div>
      </Fragment>
    );
  }
}

export default RunScript;
