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
        uat: ["ANALYTICS_VALIDATION_DATA_TEST"],
        prod: ["ANALYTICS_VALIDATION_DATA"]
      }
    };
  }

  createScript(data) {
    let allData = data;
    console.log("data", allData.data.data);
    allData.data.data.map((info, key) => {
      console.log("level:", key, "info:", info);
    });

    if (allData.data.user_id !== "" && allData.data.user_id.length >= 4) {
    }
    if (allData.data.environment !== "") {
    }
  }

  render() {
    console.log("state script", this.state);
    return (
      <Fragment>
        <div id="createScript" className="col-md-4 offset-md-3">
          <button type="button" onClick={() => this.createScript(this.props)}>
            Create Script
          </button>
        </div>
      </Fragment>
    );
  }
}

export default RunScript;
