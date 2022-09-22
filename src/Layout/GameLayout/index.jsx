import { useEffect } from "react";
import GameActions from "../../containers/GameActions";
import AlbumOptions from "../../containers/AlbumOptions";
import useGame from "../../hooks/useGame";
import styles from "./index.module.scss";

const GameLayout = () => {
  const {
    albums,
    resetGame,
    currentScoreToAdd,
    onGuess,
    tries,
    round,
    totalScore,
    isGameFinished,
    getSongOfArtist,
  } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.guessSection}>
        <span>round number {round}</span>
        <AlbumOptions albums={albums} tries={tries} roundNumber={round} />
      </div>
      <GameActions
        isGameFinished={isGameFinished}
        numberOfPoints={currentScoreToAdd}
        totalScore={totalScore}
        albums={albums}
        onGuess={onGuess}
        resetGame={resetGame}
        tries={tries}
        getSongOfArtist={getSongOfArtist}
      />
    </div>
  );
};

export default GameLayout;
