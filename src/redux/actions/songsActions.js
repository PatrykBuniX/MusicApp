import { getSongs, getMoreSongs, getAlbum } from "../../apiCalls";

const fetchingSongsStart = () => ({
  type: "FETCHING_SONGS_START"
});
const fetchingSongsSuccess = result => ({
  type: "FETCHING_SONGS_SUCCESS",
  payload: result
});
const fetchingMoreSongsSuccess = result => ({
  type: "FETCHING_MORE_SONGS_SUCCESS",
  payload: result
});
const fetchingSongsError = error => ({
  type: "FETCHING_SONGS_ERROR",
  payload: error
});

export const fetchSongs = query => {
  return async dispatch => {
    dispatch(fetchingSongsStart());
    try {
      const songs = await getSongs(query);
      dispatch(
        fetchingSongsSuccess({
          songs,
          index: 0,
          lastQuery: query,
          isFetching: false
        })
      );
    } catch (error) {
      dispatch(
        fetchingSongsError({
          errorMessage: error.response.data.message,
          isFetching: false
        })
      );
    }
  };
};

export const fetchMoreSongs = (query, index) => {
  return async dispatch => {
    dispatch(fetchingSongsStart());
    try {
      const data = await getMoreSongs(query, index);
      dispatch(
        fetchingMoreSongsSuccess({
          songs: data.songs,
          index: data.index,
          lastQuery: query,
          isFetching: false
        })
      );
    } catch (error) {
      dispatch(
        fetchingSongsError({
          errorMessage: error.response.data.message,
          isFetching: false
        })
      );
    }
  };
};

export const fetchAlbum = id => {
  return async dispatch => {
    dispatch(fetchingSongsStart());
    try {
      const songs = await getAlbum(id);
      dispatch(
        fetchingSongsSuccess({
          songs,
          lastQuery: "",
          isFetching: false
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        fetchingSongsError({
          errorMessage: error.response.data.message,
          isFetching: false
        })
      );
    }
  };
};
