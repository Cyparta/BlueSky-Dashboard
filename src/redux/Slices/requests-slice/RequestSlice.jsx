import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");


export const GetAllRequests = createAsyncThunk(
    "GetAllRequests",
    async (search, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/approval/?search=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const ApprovedRequest = createAsyncThunk(
    "ApprovedRequest",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/approval/${data?.id}/`, {
                method: "PATCH",
                body: JSON.stringify(data?.body) || {},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const DeclineRequest = createAsyncThunk(
    "DeclineRequest",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/approval/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export const RequestSlice = createSlice({
    name: "requests",
    initialState: {
        requests: [],
        loading: false,
        error: null,
        updateLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllRequests.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllRequests.fulfilled, (state, action) => {
            state.requests = action.payload;
            state.loading = false;
        });
        builder.addCase(GetAllRequests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(ApprovedRequest.rejected, (state, action) => {
            state.updateLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(ApprovedRequest.pending, (state) => {
            state.updateLoading = true;
            state.error = null;
        });
        builder.addCase(ApprovedRequest.fulfilled, (state, action) => {
            state.requests = action.payload;
            state.updateLoading = false;
        });
        builder.addCase(DeclineRequest.rejected, (state, action) => {
            state.updateLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(DeclineRequest.pending, (state) => {
            state.updateLoading = true;
            state.error = null;
            state.requests = [];
        });
        builder.addCase(DeclineRequest.fulfilled, (state, action) => {
            state.requests = action.payload;
            state.updateLoading = false;
            state.error = null;
        });
    }
});


export default RequestSlice.reducer;


