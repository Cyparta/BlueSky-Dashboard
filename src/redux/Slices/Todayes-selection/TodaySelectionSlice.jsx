import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");


// ----------------- Filter Drivers in Tody Table  ----------------
export const filterTodaysSelection = createAsyncThunk(
    "todaysSelection/filterTodaysSelection",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/today/?driver_type=${data?.filter}&&search=${data?.search}&&page=${data?.page || 1}`, {
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


export const updateTodaysSelection = createAsyncThunk(
    "todaysSelection/updateTodaysSelection",
    async (data , { getState, rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/today/${data?.driverID}/`, {
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


export const TodaySelectionSlice = createSlice({
    name: "todaysSelection",
    initialState: {
        todaysSelection: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(filterTodaysSelection.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(filterTodaysSelection.fulfilled, (state, action) => {
            state.todaysSelection = action.payload;
            state.loading = false;
        });
        builder.addCase(filterTodaysSelection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateTodaysSelection.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateTodaysSelection.fulfilled, (state, action) => {
            state.todaysSelection = action.payload;
            state.loading = false;
        });
        builder.addCase(updateTodaysSelection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});


export default TodaySelectionSlice.reducer;


