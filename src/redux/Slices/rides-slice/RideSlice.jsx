import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");

export const GetAllRides = createAsyncThunk(
    "rides/GetAllRides",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/ride/?status=${data?.filter}&&search=${data?.search}&&page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const UpdateRides = createAsyncThunk(
    "rides/UpdateRides",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/ride/${data?.id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(data?.body),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const DeleteRides = createAsyncThunk(
    "rides/DeleteRides",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/ride/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);





export const RideSlice = createSlice({
    name: "rides",
    initialState: {
        rides: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllRides.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllRides.fulfilled, (state, action) => {
            state.loading = false;
            state.rides = action.payload;
            state.error = null;
        });
        builder.addCase(GetAllRides.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.rides = [];
        });
        builder.addCase(DeleteRides.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteRides.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(DeleteRides.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(UpdateRides.pending, (state) => {
            state.loading = true;
            state.error = null;
        }); 
        builder.addCase(UpdateRides.fulfilled, (state, action) => {
            state.loading = false;
        }); 
        builder.addCase(UpdateRides.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default RideSlice.reducer



