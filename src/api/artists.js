import instance from "./instance";

export const ATTRIBUTES = {
  ARTIST_TERM: "artistTerm",
  SONG_TERM: "songTerm",
};
export const ENTITIES = {
  ALBUM: "album",
  SONG: "song",
};

export const fetchArtist = async ({
  artistName,
  attribute = "artistTerm",
  entity = "album",
  limit = 3,
}) => {
  try {
    const { data } = await instance.get("search", {
      params: {
        term: artistName,
        attribute,
        entity,
        limit,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("error getting artists");
  }
};

export const fetchSongOfArtist = async ({ amgArtistId }) => {
  try {
    const { data } = await instance.get("lookup", {
      params: { amgArtistId, entity: "album", limit: 5 },
    });
    return data;
  } catch (error) {}
};
