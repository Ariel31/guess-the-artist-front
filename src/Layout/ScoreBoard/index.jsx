import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopScoreBoard } from "../../api";
import styles from "./index.module.scss";

const ScoreBoard = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScoreBoard();
  }, []);

  const fetchScoreBoard = async () => {
    const scoresFetched = await getTopScoreBoard();
    setScores(scoresFetched);
  };

  return (
    <div className={styles.container}>
      <ArrowLeft color="white" onClick={() => navigate("/")} />
      {scores.length &&
        scores?.map(({ userName, score }) => (
          <div className={styles.scoreItem}>
            <span>userName {userName}</span>
            <span>score {score}</span>
          </div>
        ))}
    </div>
  );
};

export default ScoreBoard;
