import axios from "axios";

const rapidapiKey = "e3650c6f8dmsh887cb309606fb83p1d642bjsnd3e1655cd54d";
const base = "https://deezerdevs-deezer.p.rapidapi.com";

export const fetchSongs = query => {
  return async (dispatch, getState) => {
    if (!query) return;
    const url = `${base}/search?q=${query}&index=${getState().songs.index}`;
    try {
      const res = await axios.get(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": rapidapiKey
        }
      });
      const newIndex = getState().songs.index + 25;
      const { data: songs } = res.data;
      if (query === getState().songs.lastQuery) {
        dispatch({
          type: "GET_MORE_SONGS",
          songs,
          index: newIndex,
          lastQuery: query
        });
      } else {
        dispatch({
          type: "GET_SONGS",
          songs,
          index: 0,
          lastQuery: query
        });
      }
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
