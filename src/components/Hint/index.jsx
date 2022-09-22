import { useEffect, useState } from "react";

const Hint = ({ getSongOfArtist }) => {
  const [song, setSong] = useState();

  useEffect(() => {
    fetchSongName();
  }, []);

  const fetchSongName = async () => {
    const song = await getSongOfArtist();
    setSong(song);
  };

  return <span>Hint: {song?.trackName}</span>;
};

export default Hint;
