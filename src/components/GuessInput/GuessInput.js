import React, { useState, useRef, useEffect } from "react";

function GuessInput({ guesses, answer, onSubmit }) {
  const hasWon = guesses.map(({ guess }) => guess).includes(answer);
  const [guess, setGuess] = useState("");
  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus());
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ guess });
        setGuess("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        title="5 letter word"
        pattern="[a-zA-Z]{5}"
        onChange={(event) => {
          const pattern = /^[A-Z]{0,5}$/g;
          const result = event.target.value.toUpperCase();
          if (pattern.test(result) && result.length <= 5) {
            setGuess(result);
          }
        }}
        ref={inputRef}
        disabled={hasWon}
      />
    </form>
  );
}

export default GuessInput;
