import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
// la manière dont le store est gerer pourrait être améliorer par exemple ici on a que user donc on pourrait faire un store
// "baseStore" avec des info générique mais tu as l'idée de cmt ça marche : https://redux-toolkit.js.org/usage/usage-with-typescript
interface User {
  name: string;
}
type UserState = User | {};
const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
