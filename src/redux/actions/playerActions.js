export const setTrackIndex = index => {
  return { type: "SET_TRACK_INDEX", index };
};

export const togglePlay = isPlaying => {
  return { type: "TOGGLE_PLAY", isPlaying };
};
