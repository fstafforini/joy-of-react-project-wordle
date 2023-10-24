import React, { useState } from "react";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";
import EndBanner from "../EndBanner/EndBanner";
import { DEBUG } from "../../constants";
import Keyboard from "../Keyboard";
import { checkGuess } from "../../game-helpers";
import { v4 as uuidv4 } from "uuid";

function Game() {
  const [answer, setAnswer] = useState(getNewWord);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [keyboardState, setKeyboardState] = useState(initialKeyboardState());

  function addGuess({ guess }) {
    setGuesses((prevState) => {
      const key = getGuessUUID();
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
      const statusCodes = ["", "incorrect", "misplaced", "incorrect"];
      const newState = { ...prevState };
      for (const key of checkGuess(guess, answer) || []) {
        if (
          statusCodes.findIndex((status) => status === key.status) >
          prevState[key.letter]
        ) {
          newState[key.letter] = key.status;
        }
      }
      return newState;
    });
    setGuess("");
  }

  function handleNewGame() {
    setGuess("");
    setGuesses([]);
    setKeyboardState(initialKeyboardState());
    setAnswer(getNewWord());
  }

  function handleKeyPress(key) {
    if (key === "0") {
      // special case: button named 0 is backspace
      if (guess.length) {
        setGuess((prevState) => prevState.slice(0, -1));
      }
    } else if (key === "1") {
      // special case: button named 1 is enter
      if (guess.length === 5) {
        addGuess({ guess, key: getGuessUUID(guess) });
      }
    } else if (guess.length < 5) {
      setGuess((prevState) => prevState.slice() + key);
    }
  }

  return (
    <>
      <GuessList guesses={guesses} answer={answer} />
      <GuessInput
        guesses={guesses}
        answer={answer}
        onSubmit={(guess) => {
          if (DEBUG) console.log(guess);
          addGuess(guess);
        }}
        guess={guess}
        setGuess={setGuess}
      />
      <EndBanner
        guesses={guesses}
        answer={answer}
        handleNewGame={handleNewGame}
      />
      <Keyboard keyboardState={keyboardState} handleKeyPress={handleKeyPress} />
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

function getGuessUUID(guess) {
  return guess + uuidv4();
}

function getNewWord() {
  const answer = sample(WORDS);
  console.log("New game started!");
  console.info({ answer });
  return answer;
}

export default Game;
