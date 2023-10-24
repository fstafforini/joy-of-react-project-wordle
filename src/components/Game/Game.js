import React, { useState } from "react";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";
import EndBanner from "../EndBanner/EndBanner";
import { DEBUG } from "../../constants";
import Keyboard from "../Keyboard";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [keyboardState, setKeyboardState] = useState(initialKeyboardState());
  const addGuess = ({ guess }) => {
    setGuesses((prevState) => {
      const key = prevState.length
        ? Math.max(...prevState.map((item) => item.key)) + 1
        : 1;
      const newState = [...prevState, { guess, key }];
      if (DEBUG)
        console.log(
          `setGuesses\n` +
            `key=${key}\n` +
            `newState=${JSON.stringify(newState)}`
        );
      return newState;
    });
    setKeyboardState((prevState) => {
      const newState = { ...prevState };
      for (const key of checkGuess(guess, answer)) {
        newState[key.letter] = key.status;
      }
      return newState;
    });
  };

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
      <Keyboard keyboardState={keyboardState} />
    </>
  );
}

function initialKeyboardState() {
  let keyboardState = {};
  for (let char = 65; char <= 90; char++) {
    keyboardState[String.fromCharCode(char)] = "";
  }
  return keyboardState;
}

export default Game;
