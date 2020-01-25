const initState = {
  trackIndex: 0,
  isPlaying: false
};

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TRACK_INDEX":
      console.log("set order:", action.index);
      return {
        ...state,
        trackIndex: action.index
      };
    case "TOGGLE_PLAY":
      console.log("toggle play:", action.isPlaying);
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    default:
      return state;
  }
};

export default playerReducer;
