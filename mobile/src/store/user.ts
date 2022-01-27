import { User } from "../models";
type UserState = User | {};
export default (state: UserState = {}, action) => {
  return state;
};
