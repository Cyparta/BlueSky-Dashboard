import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token =getCookie("token");



// ----------------- Verified The OTP  ----------------

export const VerifyOTP = createAsyncThunk(
    "auth/VerifyOTP",
    async (formData, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`${BaseUrl}/api/verifyotp/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



// ---------------------- Change Password -----------------------------

export const ChangePassword = createAsyncThunk(
    "auth/ChangePassword",
    async (body, { getState, rejectWithValue, dispatch }) => {
        const tokenn=getCookie("token")
        try {
            const response = await fetch(`${BaseUrl}/api/changepassword/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${tokenn}`,
                },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const LoginRequest = createAsyncThunk(
    "auth/LoginRequest",
    async (body, { getState, rejectWithValue, dispatch }) => {
        console.log(body)
        try {
            const response = await fetch(`${BaseUrl}/dashboard/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Token ${token}`,
                },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        verified: [],
        loading: false,
        error: null,
        updatePassword : [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(VerifyOTP.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(VerifyOTP.fulfilled, (state, action) => {
            state.loading = false;
            state.verified = action.payload;
            state.error = null;
        });
        builder.addCase(VerifyOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.verified = [];
        });
        builder.addCase(ChangePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.updatePassword = [];
        });
        builder.addCase(ChangePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.updatePassword = action.payload;
        });
        builder.addCase(ChangePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.updatePassword = [];
        });
        builder.addCase(LoginRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.verified = [];
        });
        builder.addCase(LoginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.verified = action.payload;
        });
        builder.addCase(LoginRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.verified = [];
        });
        

    },
});


export default AuthSlice.reducer;