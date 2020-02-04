const initState = { songs: [], index: 0, lastQuery: null, activeSong: "" };

const songsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SONGS":
      console.log(action.songs);
      console.log("get songs", action.songs, action.index, action.lastQuery);
      return {
        songs: [...action.songs],
        index: action.index,
        lastQuery: action.lastQuery
      };
    case "GET_MORE_SONGS":
      console.log(
        "get more songs",
        action.songs,
        action.index,
        action.lastQuery
      );
      return {
        songs: [...state.songs, ...action.songs],
        index: action.index,
        lastQuery: action.lastQuery
      };
    case "GET_SONGS_ERROR":
      console.log("get songs error", action.err);
      return state;
    case "SET_SONGS":
      console.log("set songs", action.elements);
      return { ...state, elements: action.elements };
    default:
      return state;
  }
};

export default songsReducer;
