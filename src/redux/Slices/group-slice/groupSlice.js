import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const token =getCookie("token");

export const Add_Group = createAsyncThunk(
    "/addGroup",
    async (body, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/groups/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
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

export const GetAllGroups = createAsyncThunk(
    "/GetAllGroups",
    async (search,{ rejectWithValue  }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/groups/?search=${search}`, {
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
export const GetSpecificGroups = createAsyncThunk(
    "/group/GetSpecificGroups",
    async (id,{ rejectWithValue  }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/groups/${id}`, {
                method: "PATCH",
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
export const DeleteGroup = createAsyncThunk(
    "/GetAllGroups/DeleteGroup",
    async (id,{ rejectWithValue  }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/groups/${id}`, {
                method: "DELETE",
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
export const UpdateGroup = createAsyncThunk(
    "/group/UpdateGroup",
    async ({values,id},{ rejectWithValue  }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/groups/${id}`, {
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

export const GroupSlice = createSlice({
    name: "groups",
    initialState: {
        groupLoading: false,
        error: null,
        Groups:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Add_Group.pending, (state) => {
            state.load = true;
            state.error = null;
        });
        builder.addCase(Add_Group.fulfilled, (state, action) => {
            state.load = false;
            state.Groups = action.payload;
            state.error = null;
        });
        builder.addCase(Add_Group.rejected, (state, action) => {
            state.load = false;
            state.error = action.payload;
            state.Groups = [];
        });
        builder.addCase(GetAllGroups.pending, (state) => {
            state.groupLoading = true;
            state.error = null;
        });
        builder.addCase(GetAllGroups.fulfilled, (state, action) => {
            state.groupLoading = false;
            state.Groups = action.payload;
            state.error = null;
        });
        builder.addCase(GetAllGroups.rejected, (state, action) => {
            state.groupLoading = false;
            state.error = action.payload;
            state.Groups = [];
        });
        builder.addCase(GetSpecificGroups.pending, (state) => {
            state.groupLoading = true;
            state.error = null;
        });
        builder.addCase(GetSpecificGroups.fulfilled, (state, action) => {
            state.groupLoading = false;
            state.Groups = action.payload;
            state.error = null;
        });
        builder.addCase(GetSpecificGroups.rejected, (state, action) => {
            state.groupLoading = false;
            state.error = action.payload;
            state.Groups = [];
        });
        builder.addCase(UpdateGroup.pending, (state) => {
            state.groupLoading = true;
            state.error = null;
        });
        builder.addCase(UpdateGroup.fulfilled, (state, action) => {
            state.groupLoading = false;
            state.Groups = action.payload;
            state.error = null;
        });
        builder.addCase(UpdateGroup.rejected, (state, action) => {
            state.groupLoading = false;
            state.error = action.payload;
            state.Groups = [];
        });
    }
});

export default GroupSlice.reducer;