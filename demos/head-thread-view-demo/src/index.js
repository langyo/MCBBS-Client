import React from "react";
import ReactDOM from "react-dom";
import Floor from "./floor";
import Thread from "./thread";

import testData from "./testData";

ReactDOM.render(
  <div>
    <Thread thread={825413} />
  </div>,
  document.querySelector("#root")
);
