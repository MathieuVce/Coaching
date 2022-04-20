import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InfoService from "../services/info";
import { AllState } from '../../../common/info'

const initialState: AllState =  {
    comments: [],
    users: [],
    reviews: []
};

export const getComments = createAsyncThunk('getComments', async (_, thunkAPI) => {
    try {
        console.log('la 1')
        const comments = await InfoService.getComments();
        debugger;
        return { comments };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});



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