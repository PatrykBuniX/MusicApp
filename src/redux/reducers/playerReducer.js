const initState = { prev: null, current: null, next: null };

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_ORDER":
      console.log("set order:", action.elements);
      return action.elements;
    default:
      return state;
  }
};

export default playerReducer;
