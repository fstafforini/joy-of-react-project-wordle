import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function EndBanner({ guesses, answer, handleNewGame }) {
  const hasWon = guesses.map(({ guess }) => guess).includes(answer);
  if (!hasWon && guesses.length < NUM_OF_GUESSES_ALLOWED) return;
  return hasWon ? (
    <div className="happy banner">
      <span>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{guesses.length} guesses</strong>.
      </span>
      <button className="new-game" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  ) : (
    <div className="sad banner">
      <span>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </span>
      <button className="new-game" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}

export default EndBanner;
