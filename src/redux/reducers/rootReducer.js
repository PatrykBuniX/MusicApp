import songsReducer from "./songsReducer";
import playerReducer from "./playerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  songs: songsReducer,
  player: playerReducer
});

export default rootReducer;
