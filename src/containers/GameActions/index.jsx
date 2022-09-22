import { useRef, useState } from "react";
import styles from "./index.module.scss";
import { createScore } from "../../api";
import Hint from "../../components/Hint";
import { useNavigate } from "react-router-dom";

const GameActions = ({
  numberOfPoints,
  onGuess,
  totalScore,
  resetGame,
  isGameFinished,
  tries,
  getSongOfArtist,
}) => {
  const inputRef = useRef();
  const userNameInputRef = useRef();
  const [successMessgae, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const guessTheArtist = () => {
    const guessValue = inputRef.current.value;
    onGuess(guessValue);
    inputRef.current.value = "";
  };

  const onResetGame = () => {
    inputRef.current.value = "";
    resetGame();
  };

  const onSaveScore = async () => {
    const userName = userNameInputRef.current.value;
    await createScore({ userName, score: totalScore });
    setSuccessMessage("Score Added");
    userNameInputRef.current.value = "";
  };

  return (
    <div className={styles.container}>
      <span>For {numberOfPoints} points</span>
      <span>Who's the artist (enter full name): </span>
      <input className={styles.input} ref={inputRef} />
      {tries === 3 && <Hint getSongOfArtist={getSongOfArtist} />}

      <span className={styles.buttons}>
        <button onClick={guessTheArtist} className={styles.btn}>
          Guess
        </button>
        <button onClick={onResetGame} className={styles.btn}>
          Reset
        </button>
        <button onClick={() => navigate("/score")} className={styles.btn}>
          To Scoreboard
        </button>

        {isGameFinished && (
          <>
            <input
              className={styles.input}
              ref={userNameInputRef}
              placeholder="enter user name"
            />
            <button onClick={onSaveScore} className={styles.btn}>
              Save
            </button>
            {successMessgae && <span>{successMessgae}</span>}
          </>
        )}
      </span>
      <h2>total score {totalScore}</h2>
    </div>
  );
};

export default GameActions;
