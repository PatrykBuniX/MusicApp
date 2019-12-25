const initState = { songs: [], index: 0 };

const songsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SONGS":
      console.log("get songs", action);
      return { songs: [...state.songs, ...action.songs], index: action.index };
    case "GET_SONGS_ERROR":
      console.log("get songs error", action);
      return state;
    default:
      return state;
  }
};

export default songsReducer;
