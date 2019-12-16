import React, { Fragment } from "react";
import "../styles/App.css";
import TableCreation from "../components/TableCreation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <div className="row">
        <header className="col-md-10 offset-md-1 header">
          <p>Katalon SQL Creator</p>
        </header>
        <div className="col-md-10 offset-md-1">
          <TableCreation />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
