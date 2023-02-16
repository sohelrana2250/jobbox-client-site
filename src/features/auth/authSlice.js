
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from './../../firebase/firebase.config';

const initialState = {
    user: { email: '', role: '' },
    isLoading: true,
    isError: false,
    error: '',
    LogOut: false


}



export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }) => {

    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user?.email;


})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {

    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user?.email;
});

export const googleSingIn = createAsyncThunk('auth/googleSingIn', async () => {

    const googleProvider = new GoogleAuthProvider();

    const data = await signInWithPopup(auth, googleProvider);
    return data.user?.email;

});

export const getUser = createAsyncThunk('auth/getUser', async (email) => {

    const res = await fetch(`https://jobbox-server-cyan.vercel.app/employerUser/${email}`);
    const data = await res.json();
    return data;


})

const authSlice = createSlice({

    name: 'authSlice',
    initialState,
    reducers: {
        logoutRedux: (state) => {
            state.user.email = ''
        },
        setUser: (state, action) => {


            state.user.email = action.payload;
            state.isLoading = false;
        }

    },
    extraReducers: (builder) => {


        builder.addCase(createUser.pending, (state, action) => {

            state.isLoading = true;
            state.isError = false;
            state.error = '';

        }).addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = action.payload;
            state.error = '';
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.user.email = '';
            state.error = action.error.message;

        }).addCase(loginUser.pending, (state, action) => {

            state.isLoading = true;
            state.isError = false;
            state.error = '';

        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = action.payload;
            state.error = '';

        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.user.email = '';
            state.error = action.error.message;
        }).addCase(googleSingIn.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        }).addCase(googleSingIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user.email = action.payload;
            state.error = '';

        }).addCase(googleSingIn.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.user.email = '';
            state.error = action.error.message;
        }).addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = '';

        }).addCase(getUser.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
            state.error = '';
        }).addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const { logoutRedux, setUser } = authSlice.actions;
export default authSlice.reducer;