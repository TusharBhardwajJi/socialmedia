import { createReducer } from "@reduxjs/toolkit";

const initialState= {};

export const likeReducer = createReducer(initialState , {
    likeRequest : (state) => {
        state.loading  = true;
    },
    likeSuccess : (state,action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    likeFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    
    },
    
    commentRequest : (state) => {
        state.loading  = true;
    },
    commentSuccess : (state,action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    commentFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    
    },
    
    delCommentRequest : (state) => {
        state.loading  = true;
    },
    delCommentSuccess : (state,action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    delCommentFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    
    },

    newPostRequest : (state) => {
        state.loading  = true;
    },
    newPostSuccess : (state,action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    newPostFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    
    },


    updateCaptionRequest : (state) => {
        state.loading  = true;
    },
    updateCaptionSuccess : (state,action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    updateCaptionFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    
    },

    deletePostRequest : (state) => {
        state.loading  = true;
    },
    deletePostSuccess : (state,action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    deletePostFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    
    },



    editUserRequest :  (state) => {
        state.loading=true;
    },
    editUserSuccess :  (state, action) => {
        state.loading=false;
        state.message = action.payload;
    },
    editUserFailure :  (state, action) => {
        state.loading=false;
        state.error = action.payload
    },


    changePasswordRequest :  (state) => {
        state.loading=true;
    },
    changePasswordSuccess :  (state, action) => {
        state.loading=false;
        state.message = action.payload;
    },
    changePasswordFailure :  (state, action) => {
        state.loading=false;
        state.error = action.payload
    },



    deleteAccountRequest :  (state) => {
        state.loading=true;
    },
    deleteAccountSuccess :  (state, action) => {
        state.loading  = false;
        state.message = action.payload;
    }, 
    deleteAccountFailure :  (state, action) => {
        state.loading  = false;
        state.error = action.payload;
    },

    forgotPasswordRequest :  (state) => {
        state.loading=true;
    },
    forgotPasswordSuccess :  (state, action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    forgotPasswordFailure :  (state, action) => {
        state.loading  = false;
        state.error = action.payload;
    },

    resetPasswordRequest :  (state) => {
        state.loading=true;
    },
    resetPasswordSuccess :  (state, action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    resetPasswordFailure :  (state, action) => {
        state.loading  = false;
        state.error = action.payload;
    },

    followRequest :  (state) => {
        state.loading=true;
    },
    followSuccess :  (state, action) => {
        state.loading  = false;
        state.message = action.payload;
    },
    followFailure :  (state, action) => {
        state.loading  = false;
        state.error = action.payload;
    },


    clearErrors : (state ) => { // fire this to state null
        state.error =null;

    },
    clearMessage : (state ) => {   // fire this to message null 
        state.message =null;

    },
     // null krdo vrna state ma esa hi pde rhenge
})


export const myPostsReducer = createReducer(initialState , {
    
    myPostsRequest : (state) => {
        state.loading  = true;
    },
    myPostsSuccess : (state,action) => {
        state.loading  = false;
        state.posts = action.payload;
    },
    myPostsFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    },

    clearErrors : (state ) => {
        state.error =null;
    },
    clearMessage : (state ) => {   
        state.message =null;

    },
})

export const otherUserPostsReducer = createReducer(initialState , {
    
    otherUserPostsRequest : (state) => {
        state.loading  = true;
    },
    OtherUserPostsSuccess : (state,action) => {
        state.loading  = false;
        state.posts = action.payload;
    },
    OtherUserPostsFailure : (state,action) => {
        state.loading  = false;
        state.error = action.payload;
    },

    clearErrors : (state ) => {
        state.error =null;
    },

})