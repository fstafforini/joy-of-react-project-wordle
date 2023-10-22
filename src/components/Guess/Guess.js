import React from "react";
import { checkGuess } from "../../game-helpers";
import { range } from "lodash";

function Guess({ guess, answer }) {
  const result =
    checkGuess(guess, answer) ||
    Array.from(range(5).map(() => ({ letter: null, status: null })));
  return (
    <p className="guess">
      {result.map(({ letter, status }, pos) => (
        <span className={`cell${status ? " " + status : ""}`} key={pos}>
          {letter !== null && letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
