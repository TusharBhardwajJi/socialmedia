import {configureStore} from  "@reduxjs/toolkit"
import { likeReducer, myPostsReducer, otherUserPostsReducer } from "./reducers/post";
import { allUsersReducers, otherUserProfileReducers, postOffollowingReducer, userReducer } from "./reducers/user";

const store = configureStore({
    reducer : {
        user : userReducer,
        postOffollowing : postOffollowingReducer,
        allUsers : allUsersReducers,
        like : likeReducer,
        myPosts : myPostsReducer,
        userProfile : otherUserProfileReducers,
        otherUserPosts : otherUserPostsReducer,
    }
});

export default store;