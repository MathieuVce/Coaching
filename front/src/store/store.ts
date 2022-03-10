import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user";
import { useSelector as rawUseSelector, TypedUseSelectorHook,
} from 'react-redux';

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;