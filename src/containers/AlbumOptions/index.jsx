import GuessItem from "../../components/GuessItem";
import styles from "./index.module.scss";

const GuessList = ({ albums, tries }) => {
  return (
    <div className={styles.container}>
      {albums?.slice(0, tries).map((album) => (
        <GuessItem albumName={album.albumName} />
      ))}
    </div>
  );
};

export default GuessList;
