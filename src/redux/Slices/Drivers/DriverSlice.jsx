import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");



export const GetAllDrivers = createAsyncThunk(
    "drivers/GetAllDrivers",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/info/?search=${data?.search}&&page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const GetSpecificDriver = createAsyncThunk(
    "drivers/GetSpecificDriver",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/info/${id}/`, {
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


export const DeleteDrivers = createAsyncThunk(
    "drivers/DeleteDrivers",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/info/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const GetDriverHistory = createAsyncThunk(
    "drivers/GetDriverHistory",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/info/${data?.id}/rides/?page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const SentMessage = createAsyncThunk(
    "drivers/SentMesssage",
    async (data, { getState, rejectWithValue, dispatch }) => {
        console.log(data)
        try {
            const response = await fetch(`${BaseUrl}/dashboard/send_dashboard_message_to_user/${data?.id}/`, {
                method: "POST",
                body: JSON.stringify(data?.body) || {},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to sent message to this driver')
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const UpdateDriverReducer = createAsyncThunk(
    "drivers/UpdateDriverReducer",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/info/${data?.id}/`, {
                method: "PATCH",
                body: JSON.stringify(data?.body) || {},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update This Driver')
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);






export const DriverSlice = createSlice({
    name: "drivers",
    initialState: {
        drivers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllDrivers.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetAllDrivers.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers = action.payload;
            })
            .addCase(GetAllDrivers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(GetSpecificDriver.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetSpecificDriver.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers = action.payload;
            })
            .addCase(GetSpecificDriver.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.drivers = [];
            });
        builder
            .addCase(DeleteDrivers.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteDrivers.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(DeleteDrivers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(GetDriverHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetDriverHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers = action.payload;
            })
            .addCase(GetDriverHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(UpdateDriverReducer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateDriverReducer.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.drivers = action.payload;
            })
            .addCase(UpdateDriverReducer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.drivers = [];
            });
    },
})



export default DriverSlice.reducer;


