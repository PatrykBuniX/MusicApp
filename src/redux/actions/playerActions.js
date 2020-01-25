export const setTrackIndex = index => {
  return dispatch => {
    dispatch({ type: "SET_TRACK_INDEX", index });
  };
};

export const togglePlay = isPlaying => {
  return dispatch => {
    dispatch({ type: "TOGGLE_PLAY", isPlaying });
  };
};
