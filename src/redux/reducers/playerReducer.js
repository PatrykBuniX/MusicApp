const initState = {
  elements: { prev: null, current: null, next: null },
  isPlaying: false
};

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_ORDER":
      console.log("set order:", action.elements);
      return {
        ...state,
        elements: action.elements
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
