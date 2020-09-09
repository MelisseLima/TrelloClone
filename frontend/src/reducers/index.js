import { combineReducers } from "redux";
import listsReducers from "./listsReducer";

export default combineReducers({
  lists: listsReducers,
});
