import React, { Component, Fragment } from "react";
import InputText from "./inputText";
import SelectComponent from "./selectComponent";

class Rowbyrow extends Component {
  constructor(props) {
    super(props);
    this.renderRows = this.renderRows.bind(this);

    this.state = {
      value: "",
      variable: ""
    };
  }

  renderRows() {
    let items = [];
    for (var i = 0; i < this.props.rows; i++) {
      var id = i + 1;
      items.push(
        <tr id={id}>
          <SelectComponent id={id} globalHandler={this.props.globalHandler} />
          <InputText
            id={id}
            globalHandler={this.props.globalHandler}
            flag={this.props.flag}
          />
        </tr>
      );
    }
    return items;
  }

  render() {
    return <Fragment>{this.renderRows()}</Fragment>;
  }
}

export default Rowbyrow;
