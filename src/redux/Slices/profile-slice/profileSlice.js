import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");


export const GetProfile = createAsyncThunk(
    "GetProfile",
    async (token,{ getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/profile/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        Profile: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.verified = action.payload;
            state.error = null;
        });
        builder.addCase(GetProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.verified = [];
        });
        

    },
});


export default profileSlice.reducer;