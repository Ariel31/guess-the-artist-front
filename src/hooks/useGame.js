import { useEffect, useState } from "react";
import { ATTRIBUTES, ENTITIES, fetchArtist } from "../api/artists";
import { artistList } from "../constants/artists";
import {
  getAlbumsFromResponse,
  showNextAlbum,
} from "../helpers/artists.mapper";

const pointsAccordingToTries = {
  1: 5,
  2: 3,
  3: 1,
};

const defaultGameValue = {
  round: 1,
  tries: 1,
  totalScore: 0,
  isOngoingGame: true,
};

const LAST_ROUND = 5;

const useGame = () => {
  const [game, setGame] = useState(defaultGameValue);
  const [artistsPicked, setArtistsPicked] = useState(new Set());

  useEffect(() => {
    const loadedGame = JSON.parse(localStorage.getItem("game"));
    if (loadedGame?.isOngoingGame) {
      setGame(loadedGame);
    } else startRound();
  }, []);

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify(game));
  }, [game]);

  const getRandomArtist = () => {
    let isAlreadyPicked = false;
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * artistList.length);
      isAlreadyPicked = artistsPicked.has(randomNumber);
    } while (isAlreadyPicked);

    artistsPicked.add(randomNumber);
    const artist = artistList[randomNumber];
    return artist;
  };

  const startRound = async (aditionalOptions = {}) => {
    if (aditionalOptions?.round > LAST_ROUND) handleLastRound();

    const randomArtist = getRandomArtist();
    localStorage.setItem("artist", randomArtist);

    const artist = await fetchArtist({ artistName: randomArtist });
    const albumNames = getAlbumsFromResponse(artist);
    setGame({ ...game, albums: albumNames, tries: 1, ...aditionalOptions });
  };

  const handleLastRound = () => {
    artistsPicked.clear();
    return setGame({
      ...game,
      isOngoingGame: false,
      totalScore: game.totalScore + pointsAccordingToTries[game.tries],
    });
  };

  const resetGame = () => {
    artistsPicked.clear();
    startRound(defaultGameValue);
  };

  const onGuess = (guess) => {
    const artist = localStorage.getItem("artist");

    if (artist === guess) {
      startRound({
        totalScore: game.totalScore + pointsAccordingToTries[game.tries],
        round: game.round + 1,
      });
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    const updateTries = game.tries + 1;
    if (updateTries === 4) return startRound({ round: game.round + 1 });

    const updatedAlbums = showNextAlbum(game.albums, game.tries - 1);
    setGame({ ...game, tries: updateTries, albums: updatedAlbums });
  };

  const getSongOfArtist = async () => {
    const limit = 10;
    const randomNumber = Math.floor(Math.random() * limit);

    const songs = await fetchArtist({
      artistName: localStorage.getItem("artist"),
      attribute: ATTRIBUTES.SONG_TERM,
      entity: ENTITIES.SONG,
      limit,
    });

    const song = songs.results[randomNumber];
    return song;
  };

  return {
    totalScore: game.totalScore,
    round: game.round,
    albums: game.albums,
    resetGame,
    onGuess,
    tries: game.tries,
    isGameFinished: !game.isOngoingGame,
    getSongOfArtist,
    currentScoreToAdd: pointsAccordingToTries[game.tries],
  };
};

export default useGame;
