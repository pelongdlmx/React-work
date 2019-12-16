import React, { Component, Fragment } from "react";

class InputText extends Component {
  constructor(props) {
    super(props);

    this.handleChangeVariable = this.handleChangeVariable.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeActionName = this.handleChangeActionName.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: "",
      variable: "",
      action_name: ""
    };
  }

  handleChangeActionName(event) {
    this.setState({ action_name: event.target.value });
  }

  handleChangeVariable(event) {
    this.setState({ variable: event.target.value });
  }

  handleChangeValue(event) {
    this.setState({ value: event.target.value });
  }

  handleChange(event, type, id) {
    let value = event.target.value;
    let typeData = type;
    let rowId = id;
    this.props.globalHandler(value, typeData, rowId);
  }

  render() {
    let rowId = this.props.id;
    return (
      <Fragment>
        <td>
          <input
            type="text"
            name="action_name"
            value={this.state.action_name}
            onChange={this.handleChangeActionName}
            onChange={e => {
              this.handleChangeActionName(e);
              this.handleChange(e, "action_name", rowId);
            }}
            style={{ width: "100%" }}
            placeholder="e.g. ACTION_TEST"
          />
        </td>
        <td>
          <input
            type="text"
            name="variable"
            value={this.state.variable}
            onChange={e => {
              this.handleChangeVariable(e);
              this.handleChange(e, "variable", rowId);
            }}
            style={{ width: "100%" }}
            placeholder="e.g. v57"
          />
        </td>
        <td>
          <input
            type="text"
            name="value"
            value={this.state.value}
            onChange={e => {
              this.handleChangeValue(e);
              this.handleChange(e, "value", rowId);
            }}
            style={{ width: "100%" }}
            placeholder="e.g. MK10DN512VLK10R"
          />
        </td>
      </Fragment>
    );
  }
}

export default InputText;
