import React from "react";

function Keyboard({ keyboardState }) {
  const layout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div className="keyboard">
      {layout.map((keyRow, i) => (
        <div className="key-row" key={i}>
          {[...keyRow].map((key) => (
            <div
              className={`key${
                keyboardState[key] !== "" ? " " + keyboardState[key] : ""
              }`}
              key={key}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
