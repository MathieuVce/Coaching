import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState, LoginPayLoad, RegisterPayLoad, RegisterState, AllState } from "../@types/auth";
import AuthService from "../services/auth";


const user = JSON.parse(localStorage.getItem("user")!);
  
const initialState: AllState = user ?
{
    user,
    authenticated: true,
} : {
    user: undefined,
    authenticated: false,
    registered: false
};

export const login = createAsyncThunk<LoginState, LoginPayLoad>(
    'login',
    async (req, thunkAPI) => {
        try {
            const user = await AuthService.loginUser(req.email, req.password);
            return {...req, user} as LoginPayLoad;
        } catch (error: any) {
            console.log(error.message)
            alert(error.message)
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const register = createAsyncThunk<RegisterState, RegisterPayLoad>(
    'register',
    async (req, thunkAPI) => {
        try {
            const user = await AuthService.registerUser(req.email, req.password, req.displayName);
            return {...req, user} as LoginPayLoad;
        } catch (error: any) {
            console.log(error.message)
            alert(error.message)
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
        builder.addCase(register.fulfilled, state => {
            state.registered = true;
            state.authenticated = false;
        });
        builder.addCase(register.rejected, state => {
            state.registered = false;
        });
        builder.addCase(logout.fulfilled, state => {
            state.authenticated = false;
        });
    },
});


const { reducer } = authSlice;
export default reducer;