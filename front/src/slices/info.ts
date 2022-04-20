import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InfoService from "../services/info";
import { AllState, pageState, pagePayload, userPayload } from '../../../common/info'

const initialState: AllState =  {
    comments: [],
    users: [],
    reviews: []
};

export const createComments = createAsyncThunk('createComments', async (_, thunkAPI) => {
    try {
        await InfoService.createComments();
        return;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const createReviews = createAsyncThunk('createReviews', async (_, thunkAPI) => {
    try {
        await InfoService.createReviews();
        return;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const getComments = createAsyncThunk('getComments', async (_, thunkAPI) => {
    try {
        const comments = await InfoService.getComments();
        return { comments };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const createUsers = createAsyncThunk<pageState, userPayload>(
    'createUsers',
    async (req, thunkAPI) => {
        try{
            await InfoService.createUsers(req.user);
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
});

export const getUsers = createAsyncThunk('getUsers', async (_, thunkAPI) => {
    try {
        const users = await InfoService.getUsers();
        return { users };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const getReviews = createAsyncThunk('getReviews', async (_, thunkAPI) => {
    try {
        const reviews = await InfoService.getReviews();
        return { reviews };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const deleteUsers = createAsyncThunk<pageState, pagePayload>(
    'deleteUsers',
    async (req, thunkAPI) => {
        try {
            await InfoService.deleteUsers(req.what);
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const updateUsers = createAsyncThunk<pageState, pagePayload>(
    'updateUsers',
    async (req, thunkAPI) => {
        try {
            await InfoService.updateUsers(req.what);
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const deleteReviews = createAsyncThunk<pageState, pagePayload>(
    'deleteReviews',
    async (req, thunkAPI) => {
        try {
            await InfoService.deleteReviews(req.what);
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const deleteComments = createAsyncThunk<pageState, pagePayload>(
    'deleteComments',
    async (req, thunkAPI) => {
        try {
            await InfoService.deleteComments(req.what);
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload.comments;
        }),
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
        }),
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews;
        })
    },
});

export default infoSlice.reducer;