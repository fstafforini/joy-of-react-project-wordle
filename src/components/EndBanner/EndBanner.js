import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

function EndBanner({ guesses, answer }) {
  const hasWon = guesses.map(({ guess }) => guess).includes(answer);
  if (!hasWon && guesses.length < NUM_OF_GUESSES_ALLOWED) return;
  return hasWon ? (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>{guesses.length} guesses</strong>.
      </p>
    </div>
  ) : (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}

export default EndBanner;
