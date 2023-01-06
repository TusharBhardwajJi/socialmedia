import { createReducer } from "@reduxjs/toolkit";
const initialState= {};
export const userReducer = createReducer(initialState , {


    loginRequest : (state ) => {
        state.loading = true;
    },
    loginSuccess : (state , action) => {
        state.loading=false;
        state.user = action.payload;
        state.isAuthenticated = true;        // login krte time header show or not
    },
    loginFailure : (state , action) => {
        state.loading=false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

    
    registerRequest : (state ) => {
        state.loading = true;
    },
    registerSuccess : (state , action) => {
        state.loading=false;
        state.user = action.payload;
        state.isAuthenticated = true;        // regiter krte time header show or not
    },
    registerFailure : (state , action) => {
        state.loading=false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

    

    
    loadRequest : (state ) => {
        state.loading = true;
    },
    loadSuccess : (state , action) => {
        state.loading=false;
        state.user = action.payload;   
        state.isAuthenticated = true;
 
    },
    loadFailure : (state , action) => {
        state.loading=false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

    logoutRequest : (state ) => {
        state.loading = true;
    },
    logoutSuccess : (state) => {
        state.loading=false;
        state.user = null;   
        state.isAuthenticated = false;
 
    },
    logoutFailure : (state , action) => {
        state.loading=false;
        state.error = action.payload;
        state.isAuthenticated = true;

    },

    clearErrors : (state) => {
        state.error = null;
    },


})


export const postOffollowingReducer = createReducer(initialState , {
    postOffollowingRequest :  (state) => {
        state.loading=true;
    },
    postOffollowingSuccess :  (state, action) => {
        state.loading=false;
        state.posts = action.payload;
    },
    postOffollowingFailure :  (state, action) => {
        state.loading=false;
        state.error = action.payload
    },
    clearErrors : (state) => {
        state.error = null;
    },
})


export const allUsersReducers = createReducer(initialState , {
    allUsersRequest :  (state) => {
        state.loading=true;
    },
    allUsersSuccess :  (state, action) => {
        state.loading=false;
        state.users = action.payload;
    },
    allUsersFailure :  (state, action) => {
        state.loading=false;
        state.error = action.payload
    },


    clearErrors : (state) => {
        state.error = null;
    },
})

export const otherUserProfileReducers = createReducer(initialState , {
    otherUserProfileRequest :  (state) => {
        state.loading=true;
    },
    otherUserProfileSuccess :  (state, action) => {
        state.loading=false;
        state.user = action.payload;
    },
    otherUserProfileFailure :  (state, action) => {
        state.loading=false;
        state.error = action.payload
    },


    clearErrors : (state) => {
        state.error = null;
    },
})


