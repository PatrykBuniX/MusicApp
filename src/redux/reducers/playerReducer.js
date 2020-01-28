const initState = {
  trackIndex: 0,
  isPlaying: false
};

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TRACK_INDEX":
      return {
        ...state,
        trackIndex: action.index
      };
    case "TOGGLE_PLAY":
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    default:
      return state;
  }
};

export default playerReducer;
