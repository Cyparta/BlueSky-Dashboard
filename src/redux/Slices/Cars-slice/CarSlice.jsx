import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;


const token =getCookie("token");


export const GetAllCars = createAsyncThunk(
    "cars/GetAllCars",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/cars/?car_type=${data?.filter}&&search=${data?.search}&&page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const GetSpecificCar = createAsyncThunk(
    "cars/GetSpecificCar",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/cars/${id}/`, {
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


export const GetCarHistory = createAsyncThunk(
    "cars/GetCarHistory",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/car/${data?.id}/rides/?page=${data?.page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const DeleteCar = createAsyncThunk(
    "cars/DeleteCar",
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/cars/${id}/`, {
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


export const AddNewCar = createAsyncThunk(
    "cars/AddNewCar",
    async (formData, { rejectWithValue  }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/cars/`, {
                method: "POST",
                body: formData || {},
                headers: {
                    "Authorization": `Token ${token}`,
                },
            });

            if (response.status === 400) {
                return response.json();
            }
            return response.status;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const UpdateCarReducer = createAsyncThunk(
    "cars/UpdateCarReducer",
    async (data, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/dashboard/cars/${data?.id}/`, {
                method: "PATCH",
                body: JSON.stringify(data?.body) || {},
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update This Car')
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const CarSlice = createSlice({
    name: "cars",
    initialState: {
        cars: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAllCars.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllCars.fulfilled, (state, action) => {
            state.cars = action.payload;
            state.loading = false;
        });
        builder.addCase(GetAllCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(GetSpecificCar.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetSpecificCar.fulfilled, (state, action) => {
            state.cars = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(GetSpecificCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.cars = [];
        });
        builder.addCase(GetCarHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetCarHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.cars = action.payload;
        });
        builder.addCase(GetCarHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.cars = [];
        });
        builder.addCase(AddNewCar.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(AddNewCar.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.cars = action.payload;
        });
        builder.addCase(AddNewCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.cars = [];
        });
        builder.addCase(DeleteCar.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(DeleteCar.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(DeleteCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(UpdateCarReducer.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UpdateCarReducer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.cars = action.payload;
        });
        builder.addCase(UpdateCarReducer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.cars = [];
        });
    }
});


export default CarSlice.reducer;
