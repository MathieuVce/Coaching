import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import AuthService from "../services/auth";


const user = JSON.parse(localStorage.getItem("user")!);

export interface AuthState {
    password?: string;
    email?: string;
    authenticated?: boolean;
    user?: User;
  }
  
  const initialState: AuthState = user ?
  {
    user,
    authenticated: true,
  } : {
    user: undefined,
    authenticated: false,
  };
  
  interface PayLoad {
    password: string;
    email: string;
    user?: User;
  }

  export const login = createAsyncThunk<AuthState, PayLoad>(
    'login',
    async (req, thunkAPI) => {
      try {
          const user = await AuthService.loginUser(req.email, req.password);
          return {...req, user} as PayLoad;
      } catch (error: any) {
          console.log(error.message)
          return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
    try {
        AuthService.logoutUser();
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.authenticated = true;
        });
        builder.addCase(login.rejected, state => {
            state.authenticated = false;
        });
        builder.addCase(logout.fulfilled, state => {
            state.authenticated = false;
        });
    },
});


const { reducer } = authSlice;
export default reducer;