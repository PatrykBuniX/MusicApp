export const setTimeStamp = secs => {
  if (!secs) {
    secs = 0;
  }
  const mins = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
};
