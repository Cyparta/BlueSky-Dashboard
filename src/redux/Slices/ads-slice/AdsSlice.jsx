import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const token =getCookie("token");


export const GetAllAds = createAsyncThunk(
    "ads/GetAllAds",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/service/ad/?search=${data?.search}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const GetSpecificAds = createAsyncThunk(
    "ads/GetSpecificAds",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/service/ad/${id}/`, {
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


export const DeleteAds = createAsyncThunk(
    "ads/DeleteAds",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/service/ad/${id}/`, {
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


export const CreateAds = createAsyncThunk(
    "ads/CreateAds",
    async (formData, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/service/ad/`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Token ${token}`
                }
            });

            if (response.status === 400) {
                return response.json();
            }
            return response.status;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const UpdateAds = createAsyncThunk(
    "ads/UpdateAds",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/service/ad/${data?.id}/`, {
                method: "PATCH",
                body: data?.body || {},
                headers: {
                    "Authorization": `Token ${token}`
                }
            });
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const AdsSlice = createSlice({
    name: "ads",
    initialState: {
        ads: [],
        create_ads: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllAds.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllAds.fulfilled, (state, action) => {
            state.loading = false;
            state.ads = action.payload;
            state.error = null;
            state.create_ads = [];
        });
        builder.addCase(GetAllAds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.ads = [];
            state.create_ads = [];
        });
        builder.addCase(GetSpecificAds.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetSpecificAds.fulfilled, (state, action) => {
            state.loading = false;
            state.ads = [];
            state.error = null;
            state.create_ads =action.payload;
        });
        builder.addCase(GetSpecificAds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.ads = [];
            state.create_ads = [];
        });
        builder.addCase(DeleteAds.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteAds.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(DeleteAds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(CreateAds.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(CreateAds.fulfilled, (state, action) => {
            state.loading = false;
            state.create_ads = action.payload;
            state.error = null;
        });
        builder.addCase(CreateAds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.create_ads = [];
        });
        builder.addCase(UpdateAds.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UpdateAds.fulfilled, (state, action) => {
            state.loading = false;
            state.create_ads = action.payload;
            state.error = null;
        });
        builder.addCase(UpdateAds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.create_ads = [];
        });
    }
});


export default AdsSlice.reducer;



