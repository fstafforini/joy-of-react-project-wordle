import React, { useState } from "react";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";
import EndBanner from "../EndBanner/EndBanner";
import { DEBUG } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const addGuess = ({ guess }) =>
    setGuesses((prevList) => {
      const key = prevList.length
        ? Math.max(...prevList.map((item) => item.key)) + 1
        : 1;
      const newList = [...prevList, { guess, key }];
      if (DEBUG)
        console.log(
          `setGuesses\n` + `key=${key}\n` + `newList=${JSON.stringify(newList)}`
        );
      return newList;
    });

  return (
    <>
      <GuessList guesses={guesses} answer={answer} />
      <GuessInput
        guesses={guesses}
        answer={answer}
        onSubmit={(guess) => {
          console.log(guess);
          addGuess(guess);
        }}
      />
      <EndBanner guesses={guesses} answer={answer} />
    </>
  );
}

export default Game;
