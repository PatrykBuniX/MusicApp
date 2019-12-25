import { createStore } from "redux";

function todoReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

const store = createStore(todoReducer, ["Use Redux"]);

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs"
});
console.log(store.getState());
