import axios from "axios";
import rapidapiKey from "../../apiKey";
const base = "https://deezerdevs-deezer.p.rapidapi.com";

export const fetchSongs = query => {
  return async dispatch => {
    if (!query) return;
    const url = `${base}/search?q=${query}&index=0`;
    try {
      const res = await axios.get(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": rapidapiKey
        }
      });
      const { data: songs } = res.data;
      dispatch({
        type: "GET_SONGS",
        songs,
        index: 0,
        lastQuery: query
      });
    } catch (err) {
      dispatch({ type: "GET_SONGS_ERROR", err });
    }
  };
};

export const fetchMoreSongs = query => {
  return async (dispatch, getState) => {
    if (!query) return;
    const url = `${base}/search?q=${query}&index=${getState().songs.index}`;
    try {
      const res = await axios.get(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": rapidapiKey
        }
      });
      const newIndex = getState().songs.index + 25;
      const { data: songs } = res.data;
      dispatch({
        type: "GET_MORE_SONGS",
        songs,
        index: newIndex,
        lastQuery: query
      });
    } catch (err) {
      dispatch({ type: "GET_SONGS_ERROR", err });
    }
  };
};

export const fetchAlbum = id => {
  return async dispatch => {
    if (!id) return;
    const url = `${base}/album/${id}`;
    try {
      const res = await axios.get(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": rapidapiKey
        }
      });
      const { tracks, cover } = res.data;
      const songs = [...tracks.data];
      for (let song of songs) {
        song.album = {};
        song.album.cover = cover;
      }
      dispatch({
        type: "GET_SONGS",
        songs,
        index: 0,
        lastQuery: null
      });
    } catch (err) {
      dispatch({ type: "GET_SONGS_ERROR", err });
    }
  };
};

export const setSongs = elements => {
  return dispatch => {
    dispatch({ type: "SET_SONGS", elements: elements });
  };
};
