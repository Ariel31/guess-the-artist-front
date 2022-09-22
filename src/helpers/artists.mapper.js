export const getAlbumsFromResponse = (albumsResponse) => {
  return albumsResponse.results.map((album) => ({
    albumName: album.collectionName,
    isShowing: true,
    url: album.artistViewUrl,
    amgArtistId: album.amgArtistId,
  }));
};

export const showNextAlbum = (albums, albumIndexToShow) => {
  return albums.map((album, index) => {
    if (index === albumIndexToShow) return { ...album, isShowing: true };
    else return album;
  });
};
