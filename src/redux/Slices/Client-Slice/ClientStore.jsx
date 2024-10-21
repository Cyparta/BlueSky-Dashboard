import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;


const token =getCookie("token");

export const GetAllClients = createAsyncThunk(
    "clients/GetAllClients",
    async (data, { getState, rejectWithValue, dispatch }) => {

        try {
            const response = await fetch(`${BaseUrl}/dashboard/clients/?search=${data?.search}&&page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            // console.log(response);
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const GetSpecificClient = createAsyncThunk(
    "clients/GetSpecificClient",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/clients/${id}/`, {
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


export const GetClientHistory = createAsyncThunk(
    "clients/GetClientHistory",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/client/${data?.id}/rides/?page=${data?.page || 1}`, {
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

export const GetClientRatings = createAsyncThunk(
    "clients/GetClientRatings",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/client/${id}/reviews/`, {
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

export const GetDriverRatings = createAsyncThunk(
    "clients/GetDriverRatings",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/drivers/${id}/rates/`, {
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

export const AddNewWwClient = createAsyncThunk(
    "clients/AddNewClient",
    async (body, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/register/client/`, {
                method: "POST",
                body: JSON.stringify(body) || {},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
            });
            if (!response.ok) {
                const res = await response.json()
                if (res?.message) {
                    throw new Error(res?.message);
                } else {
                    throw new Error('Failed to add new client');
                }
            }
            return response.status;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const DeleteClient = createAsyncThunk(
    "clients/DeleteClient",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/clients/${id}/`, {
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



export const UpdateClients = createAsyncThunk(
    "clients/UpdateClients",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/clients/${data?.id}/`, {
                method: "PATCH",
                body: JSON.stringify(data?.body) || {},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update client')
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const ClientSlice = createSlice({
    name: "clients",
    initialState: {
        clients: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllClients.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllClients.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.loading = false;
        });
        builder.addCase(GetAllClients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(GetSpecificClient.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetSpecificClient.fulfilled, (state, action) => {
            state.loading = false;
            state.clients = action.payload;
        });
        builder.addCase(GetSpecificClient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.clients = [];
        });
        builder.addCase(GetClientHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetClientHistory.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.loading = false;
        });
        builder.addCase(GetClientHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(GetClientRatings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetClientRatings.fulfilled, (state, action) => {
            state.loading = false;
            state.clients = action.payload;
            state.error = null;
        });
        builder.addCase(GetClientRatings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.clients = [];
        });
        builder.addCase(GetDriverRatings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetDriverRatings.fulfilled, (state, action) => {
            state.loading = false;
            state.clients = action.payload;
            state.error = null;
        });
        builder.addCase(GetDriverRatings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.clients = [];
        });
        builder.addCase(AddNewWwClient.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(AddNewWwClient.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.clients = action.payload;
        });
        builder.addCase(AddNewWwClient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.clients = [];
        });
        builder.addCase(DeleteClient.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteClient.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(DeleteClient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(UpdateClients.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UpdateClients.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(UpdateClients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.clients = [];
        });
    }
});


export default ClientSlice.reducer;


