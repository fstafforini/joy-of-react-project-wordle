import React from "react";

function Keyboard({ keyboardState, handleKeyPress }) {
  const layout = ["QWERTYUIOP", "ASDFGHJKL", "1ZXCVBNM0"]; // 0 ==> backspace, 1 ==> enter

  return (
    <div className="keyboard">
      {layout.map((keyRow, i) => (
        <div className="key-row" key={i}>
          {[...keyRow].map((letter) => (
            <Key
              letter={letter}
              keyboardState={keyboardState}
              handleKeyPress={handleKeyPress}
              key={letter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Key({ letter, keyboardState, handleKeyPress }) {
  const keyClassName =
    "key" +
    (letter === "0" || letter === "1"
      ? " special"
      : keyboardState[letter] !== ""
      ? " " + keyboardState[letter]
      : "");
  return (
    <button
      className={keyClassName}
      key={letter}
      onClick={() => {
        handleKeyPress(letter);
      }}
    >
      {letter === "0" ? "Backspace" : letter === "1" ? "Enter" : letter}
    </button>
  );
}

export default Keyboard;
