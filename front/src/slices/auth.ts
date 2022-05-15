import { createSlice, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { LoginState, LoginPayload, RegisterPayload, RegisterState, AllState, PasswordState, PasswordPayload } from "../../../common/auth";
import AuthService from "../services/auth";


// const user = JSON.parse(localStorage.getItem("user")!);
  
const initialState: AllState = {
    user: undefined,
    authenticated: false,
    registered: false,
    message: '',
    reset: false
};

export const login = createAsyncThunk<LoginState, LoginPayload>(
    'login',
    async (req, thunkAPI) => {
        try {
            const user = await AuthService.loginUser(req.email, req.password);
            // return thunkAPI.fulfillWithValue(user) as Login
            return {...req, user} as LoginPayload;
        } catch (error: any) {
            console.log(error.message)
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const register = createAsyncThunk<RegisterState, RegisterPayload>(
    'register',
    async (req, thunkAPI) => {
        try {
            const user = await AuthService.registerUser(req.email, req.password, req.displayName);
            return {...req, user} as RegisterPayload;
        } catch (error: any) {
            console.log(error.message)
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const password = createAsyncThunk<PasswordState, PasswordPayload>(
    'password',
    async (req, thunkAPI) => {
        try {
            await AuthService.passwordForgotten(req.email);
            return {...req} as PasswordPayload;
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

export const authSlice = createReducer(initialState, (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
        state.authenticated = false;
        state.message = (action.payload as LoginPayload).error;
    });
    builder.addCase(register.fulfilled, state => {
        state.registered = true;
        state.authenticated = false;
    });
    builder.addCase(register.rejected, (state, action) => {
        state.registered = false;
        state.message = (action.payload as RegisterPayload).error;
    });
    builder.addCase(password.fulfilled, state => {
        state.reset = true;
        state.message = 'Go check your mails ;)'
    });
    builder.addCase(password.rejected, (state, action) => {
        state.reset = false;
        state.message = (action.payload as PasswordPayload).error;

    });
    builder.addCase(logout.fulfilled, state => {
        state.authenticated = false;
    });
});

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder.addCase(login.fulfilled, (state, action) => {
//             state.user = action.payload.user;
//             // state.authenticated = true;
//             state.push({tmp: true})
//         });
//         builder.addCase(login.rejected, (state, action) => {
//             state.authenticated = false;
//             state.message = (action.payload as LoginPayload).error;
//         });
//         builder.addCase(register.fulfilled, state => {
//             state.registered = true;
//             state.authenticated = false;
//         });
//         builder.addCase(register.rejected, (state, action) => {
//             state.registered = false;
//             state.message = (action.payload as RegisterPayload).error;
//         });
//         builder.addCase(password.fulfilled, state => {
//             state.reset = true;
//             state.message = 'Go check your mails ;)'
//         });
//         builder.addCase(password.rejected, (state, action) => {
//             state.reset = false;
//             state.message = (action.payload as PasswordPayload).error;

//         });
//         builder.addCase(logout.fulfilled, state => {
//             state.authenticated = false;
//         });
//     },
// });

export default authSlice;