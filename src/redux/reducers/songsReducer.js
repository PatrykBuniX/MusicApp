const initState = { songs: [], index: 0, lastQuery: null, activeSong: "" };

const songsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SONGS":
      return {
        songs: [...action.songs],
        index: action.index,
        lastQuery: action.lastQuery
      };
    case "GET_MORE_SONGS":
      return {
        songs: [...state.songs, ...action.songs],
        index: action.index,
        lastQuery: action.lastQuery
      };
    case "GET_SONGS_ERROR":
      return state;
    case "SET_SONGS":
      return { ...state, elements: action.elements };
    default:
      return state;
  }
};

export default songsReducer;
