import React from "react";
import { CodeSlash } from "react-bootstrap-icons";

function MainTitle(props) {
  return (
    <div className="title-with-icon">
      <CodeSlash />
      <h2>{props.title}</h2>
    </div>
  );
}

export default MainTitle;
