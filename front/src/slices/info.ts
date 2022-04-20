import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InfoService from "../services/info";
import { AllState, deleteCommentsPayload, deleteCommentsState } from '../../../common/info'

const initialState: AllState =  {
    comments: [],
    users: [],
    reviews: []
};

export const getComments = createAsyncThunk('getComments', async (_, thunkAPI) => {
    try {
        const comments = await InfoService.getComments();
        return { comments };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const deleteComments = createAsyncThunk<deleteCommentsState, deleteCommentsPayload>(
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
        })
    },
});

export default infoSlice.reducer;