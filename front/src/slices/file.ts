import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadState, uplaodFilePayload } from "../../../common/info";
import FileService from "../services/file";

const initialState =  {
    valuesArr: [] as uploadState['valuesArr'],
};

export const uploadFile = createAsyncThunk<uploadState, uplaodFilePayload>(
    'uploadFile',
    async (req, thunkAPI) => {
        try {
            const valuesArr = await FileService.uploadFile(req.file, req.type);
            return {...req, valuesArr} as uplaodFilePayload;
        } catch (error: any) {
            console.log(error.message)
            return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
);

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.valuesArr = action.payload.valuesArr;
        })
    }
});

export default fileSlice.reducer;