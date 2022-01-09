import { combineReducers, createStore } from "redux";
import user from "./user";
const rootReducer = combineReducers({
  user,
});
export default createStore(rootReducer);
