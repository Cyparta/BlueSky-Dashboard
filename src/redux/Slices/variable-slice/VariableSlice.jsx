import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");


export const GetAllVariables = createAsyncThunk(
    "variables/GetAllVariables",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/settings/`, {
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


export const UpdateVariables = createAsyncThunk(
    "variables/UpdateVariables",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/settings/1/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data?.body),
            });
            if (!response.ok) {
                throw new Error('Failed to update This Company')
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const VariableSlice = createSlice({
    name: "variables",
    initialState: {
        variables: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllVariables.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllVariables.fulfilled, (state, action) => {
            state.loading = false;
            state.variables = action.payload;
            state.error = null;
        });
        builder.addCase(GetAllVariables.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.variables = [];
        });
        builder.addCase(UpdateVariables.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UpdateVariables.fulfilled, (state, action) => {
            state.loading = false;
            state.variables = action.payload;
            state.error = null;
        });
        builder.addCase(UpdateVariables.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.variables = [];
        });
    },
});


export default VariableSlice.reducer;