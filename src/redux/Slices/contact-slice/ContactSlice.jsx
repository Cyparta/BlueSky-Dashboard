import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const token =getCookie("token");


export const GetAllContacts = createAsyncThunk(
    "contacts/GetAllContacts",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/contact/?search=${data?.search}&&page=${data?.page || 1}`, {
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



export const DeleteContact = createAsyncThunk(
    "contacts/DeleteContact",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/contact/${id}/`, {
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

export const ContactSlice = createSlice({
    name: "contacts",
    initialState: {
        contacts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllContacts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
            state.loading = false;
        });
        builder.addCase(GetAllContacts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(DeleteContact.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteContact.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(DeleteContact.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
});


export default ContactSlice.reducer;


