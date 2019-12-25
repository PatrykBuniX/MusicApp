import axios from "axios";

const rapidapiKey = "e3650c6f8dmsh887cb309606fb83p1d642bjsnd3e1655cd54d";
const base = "https://deezerdevs-deezer.p.rapidapi.com";

export const fetchSongs = query => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(
        `${base}/search?q=${query}&index=${getState().index}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": rapidapiKey
          }
        }
      );
      const newIndex = getState().index + 25;
      const { data: songs } = res.data;
      dispatch({ type: "GET_SONGS", songs, index: newIndex });
    } catch (err) {
      dispatch({ type: "GET_SONGS_ERROR", err });
    }
  };
};
