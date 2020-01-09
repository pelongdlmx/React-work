import React, { Component, Fragment } from "react";
import Swal from "sweetalert2";
import UploadIMG from "./../../public/upload-logo.png";

class LoadScript extends Component {
  constructor(props) {
    super(props);
    this.localHandleFileChosen = this.localHandleFileChosen.bind(this);
  }

  localHandleFileChosen(event) {
    let input = event.target;
    let reader = new FileReader();
    if (this.props.mainState.edited) {
      Swal.fire({
        text: `This will erase the entire loaded information`,
        title: "You already have information loaded",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Upload anyway!"
      }).then(result => {
        if (result.value) {
          reader.onloadend = () => {
            let result = reader.result;
            this.props.handleFileChosen(result);
          };
          reader.readAsText(input.files[0]);
        }
      });
    } else {
      reader.onloadend = () => {
        let result = reader.result;
        this.props.handleFileChosen(result);
      };
      reader.readAsText(input.files[0]);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="centerUB wrapper">
          <div className="file-upload fileDropBox">
            <div className="file-select">
              <div className="file-select-button" id="fileName">
                <img className="center" src={UploadIMG} />
                <p className="centerP textDropbox">Drag & Drop your file</p>
              </div>
              <input
                type="file"
                id="file"
                className="input-file"
                accept=".sql"
                onChange={e => this.localHandleFileChosen(e)}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoadScript;
