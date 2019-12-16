import React, { Component, Fragment } from "react";

class SelectComponent extends Component {
  constructor(props) {
    super(props);

    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      action: "",
      environment: ""
    };
  }

  handleChange(event, type, id) {
    let value = event.target.value;
    let typeData = type;
    let rowId = id;
    this.props.globalHandler(value, typeData, rowId);
  }

  handleChangeEnvironment(event) {
    var environment = event.target.value !== 0 ? event.target.value : null;
    if (environment !== null) {
      this.setState({ environment: environment });
    } else {
      this.setState({ environment: " " });
    }
  }

  render() {
    let rowId = this.props.id;
    return (
      <Fragment>
        <td>{rowId}</td>
        <td scope="row">
          <select
            name="Action"
            id={"action_selector_" + rowId}
            style={{ width: "100%" }}
            onChange={e => {
              this.handleChange(e, "action", rowId);
            }}
          >
            <option value="" selected>
              Select
            </option>
            <option value="new">New</option>
            <option value="update">Update</option>
            <option value="remove">Remove</option>
          </select>
        </td>
      </Fragment>
    );
  }
}

export default SelectComponent;
