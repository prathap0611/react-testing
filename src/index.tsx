import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { RepoSummaryComponent } from "./repo-summary.component";

function App() {
  return (
    <div className="App">
      <RepoSummaryComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
