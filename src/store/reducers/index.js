import { combineReducers } from "redux";
import Movies from "./movies";

const rootReducer = combineReducers({
  movie: Movies
})
export default rootReducer