export const setOrder = elements => {
  return dispatch => {
    dispatch({ type: "SET_ORDER", elements: elements });
  };
};
