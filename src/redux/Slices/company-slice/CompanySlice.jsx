import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const token =getCookie("token");


export const GetAllCompanies = createAsyncThunk(
    "companies/GetAllCompanies",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/company/?search=${data?.search}&&page=${data?.page || 1}`, {
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

export const GetDataReport = createAsyncThunk(
    "companies/GetDataReport",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/completed-rides-totals/`, {
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
export const GetSpecificCompany = createAsyncThunk(
    "companies/GetSpecificCompany",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/company/${id}/`, {
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


export const DeleteCompany = createAsyncThunk(
    "companies/DeleteCompany",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/company/${id}`, {
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


export const CreateCompany = createAsyncThunk(
    "companies/CreateCompany",
    async (formData, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/company/`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Token ${token}`,
                },
            });
            if (response.status === 400 || response.status === 403 || response.status === 401) {
                return response.json();
            }
            return response.status;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const UpdateCompany = createAsyncThunk(
    "companies/UpdateCompany",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/company/${data?.id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${token}`,
                    // "Content-Type": "application/json",
                },
                body: data?.body||{},
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



export const CompanySlice = createSlice({
    name: "companies",
    initialState: {
        companies: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllCompanies.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllCompanies.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = action.payload;
            state.error = null;
        });
        builder.addCase(GetAllCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.companies = [];
        });
        builder.addCase(GetSpecificCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetSpecificCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = action.payload;
            state.error = null;
        });
        builder.addCase(GetSpecificCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.companies = [];
        });
        builder.addCase(DeleteCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteCompany.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(DeleteCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(CreateCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.companies = [];
        });
        builder.addCase(CreateCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.companies = action.payload;
        });
        builder.addCase(CreateCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.companies = [];
        });
        builder.addCase(UpdateCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.companies = [];
        });
        builder.addCase(UpdateCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.companies = action.payload;
        });
        builder.addCase(UpdateCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.companies = [];
        });
    }
});


export default CompanySlice.reducer


