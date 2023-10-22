import React from "react";
import { range } from "lodash";
import Guess from "../Guess/Guess";
import { NUM_OF_GUESSES_ALLOWED } from "/src/constants.js";

function GuessList({ guesses, answer }) {
  return (
    <div className="guess-results">
      {guesses.map(({ guess, key }) => (
        <Guess guess={guess} answer={answer} key={key} />
      ))}
      {guesses.length < NUM_OF_GUESSES_ALLOWED &&
        range(NUM_OF_GUESSES_ALLOWED - guesses.length).map((key) => (
          <Guess guess={null} answer={answer} key={-1 - key} />
        ))}
    </div>
  );
}

export default GuessList;
