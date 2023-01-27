import React from "react";

import classes from "./Display.module.css";

const Display = (props) => {
  return (
    <div className={classes["display-area"]}>
      <div
        className={classes.text}
        dangerouslySetInnerHTML={{ __html: props.text }}
      ></div>
    </div>
  );
};

export default Display;
