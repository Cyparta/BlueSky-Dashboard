import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");

export const GetAllPermissions = createAsyncThunk(
    "employees/GetAllPermissions",
    async (search, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/permissions/?search=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const GetAllEmployees = createAsyncThunk(
    "employees/GetAllEmployees",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/employee/?search=${data?.search}&&page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const GetSpecificEmployee = createAsyncThunk(
    "employees/GetSpecificEmployee",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/employee/${id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const DeleteEmployee = createAsyncThunk(
    "employees/DeleteEmployee",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/employee/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const UpdateEmployee = createAsyncThunk(
    "/employees/UpdateEmployee",
    async ({values,id},{ rejectWithValue  }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/employee/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const AddEmployee = createAsyncThunk(
    "employees/addNewEmployee",
    async (body, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const EmploySlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        loading: false,
        permissionLoading: false,
        error: null,
        Permissions: [],
        load:false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllPermissions.pending, (state) => {
            state.permissionLoading = true;
            state.error = null;
        });
        builder.addCase(GetAllPermissions.fulfilled, (state, action) => {
            state.permissionLoading = false;
            state.Permissions = action.payload;
            state.error = null;
        });
        builder.addCase(GetAllPermissions.rejected, (state, action) => {
            state.permissionLoading = false;
            state.error = action.payload;
            state.Permissions = [];
        });
        builder.addCase(GetAllEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.employees = [];
        });
        builder.addCase(GetAllEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = action.payload;
            state.error = null;
        });
        builder.addCase(GetAllEmployees.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.employees = [];
        });
        builder.addCase(DeleteEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(DeleteEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(GetSpecificEmployee.pending , (state , action)=>{
            state.employees = [];
            state.loading = true;
            state.error = null
        });
        builder.addCase(GetSpecificEmployee.fulfilled , (state , action)=>{
            state.employees = action.payload;
            state.loading = false;
            state.error = null
        });
        builder.addCase(GetSpecificEmployee.rejected , (state , action)=>{
            state.employees = [];
            state.loading = false;
            state.error = action.payload
        });
        builder.addCase(UpdateEmployee.pending , (state , action)=>{
            state.load = true;
            state.error = null
        });
        builder.addCase(UpdateEmployee.fulfilled , (state , action)=>{
            state.employees = action.payload;
            state.load = false;
            state.error = null
        });
        builder.addCase(UpdateEmployee.rejected , (state , action)=>{
            state.load = false;
            state.error = action.payload
        });

    }
});

export default EmploySlice.reducer;



