const initState = {
  songs: [],
  index: 0,
  lastQuery: "",
  errorMessage: "",
  isFetching: false
};

const songsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCHING_SONGS_START":
      return {
        ...state,
        isFetching: true
      };
    case "FETCHING_SONGS_SUCCESS":
      return {
        ...state,
        ...action.payload,
        songs: [...action.payload.songs]
      };
    case "FETCHING_MORE_SONGS_SUCCESS":
      return {
        ...state,
        ...action.payload,
        songs: [...state.songs, ...action.payload.songs]
      };
    case "FETCHING_SONGS_ERROR":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default songsReducer;
