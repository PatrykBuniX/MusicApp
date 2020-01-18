export const setOrder = elements => {
  return dispatch => {
    dispatch({ type: "SET_ORDER", elements });
  };
};

export const togglePlay = isPlaying => {
  return dispatch => {
    dispatch({ type: "TOGGLE_PLAY", isPlaying });
  };
};
