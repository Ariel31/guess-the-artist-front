import styles from "./index.module.scss";

const GuessItem = ({ albumName }) => {
  return (
    <div className={styles.container}>
      <span>{albumName}</span>
    </div>
  );
};

export default GuessItem;
