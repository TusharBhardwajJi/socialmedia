import axios from "axios";

export const loginUser = (email , password) => async (dispatch)=> {
    try {

        dispatch({
            type : "loginRequest"      // loading :true 

        })
        
        const {data} = await axios.post('/api/v1/login' , {email ,password}, {
            headers : {
                "Content-Type" : "application/json"
            },
        })
        
        dispatch({
            type : "loginSuccess",      // loading :false 
            payload : data.user       // data ma - success , user , token
        })

        
    } catch (error) {
        dispatch({
            type : "loginFailure",      // loading :false 
            payload : error.response.data.message,
        })
    }
}


export const registerUser = ( image , name , email , password) => async (dispatch)=> {
    try {

        dispatch({
            type : "registerRequest"      // loading :true 

        })
        
        const {data} = await axios.post('/api/v1/register' , {image , name ,email ,password}, {
            headers : {
                "Content-Type" : "application/json"
            },
        })
        
        dispatch({
            type : "registerSuccess",      // loading :false 
            payload : data.user       // data ma - success , user , token
        })

        
    } catch (error) {
        dispatch({
            type : "registerFailure",      // loading :false 
            payload : error.response.data.message,
        })
    }
}

export const loadUser = () => async (dispatch)=> {
    try {

        dispatch({
            type : "loadRequest"      // loading :true 
        })
        
        const {data} = await axios.get('/api/v1/me');
        
        dispatch({
            type : "loadSuccess",      // loading :false 
            payload : data.user       // data ma - success , user
        })

        
    } catch (error) {
        dispatch({
            type : "loadFailure",      // loading :false 
            payload : error.response.data.message,
        })
    }
};


export const getfollowingPosts = () => async(dispatch)=> {
    try {

        dispatch({
            type : "postOffollowingRequest"
        })

        // jinha ma folow krra unki post
        const {data} = await axios.get('/api/v1/post');
        dispatch({
            type : "postOffollowingSuccess",   
            payload : data.post // res.send ma success and post array hai       
        })

    } catch (error) {
        dispatch({
            type : "postOffollowingFailure",
            payload : error.response.data.message,
        })
    }
}

export const getMyPosts = () => async(dispatch)=> {
    try {

        dispatch({
            type : "myPostsRequest"
        })

        // jinha ma folow krra unki post
        const {data} = await axios.get('/api/v1/my/posts');
        dispatch({
            type : "myPostsSuccess",   
            payload : data.posts // res.send ma success and post array hai       
        })

    } catch (error) {
        dispatch({
            type : "myPostsFailure",
            payload : error.response.data.message,
        })
    }
}



export const getAllUsers = (name = '') => async(dispatch)=> {
    try {

        dispatch({
            type : "allUsersRequest"
        })

        // jinha ma folow krra unki post
        const {data} = await axios.get(`/api/v1/users?name=${name}`);
        dispatch({
            type : "allUsersSuccess",   
            payload : data.user   // {data} = {success , user}
        })

    } catch (error) {
        dispatch({
            type : "allUsersFailure",
            payload : error.response.data.message,
        })
    }
}

export const logoutUser = () => async (dispatch)=> {
    try {

        dispatch({
            type : "logoutRequest"

        })
        
        await axios.get('/api/v1/logout');
        dispatch({
            type : "logoutSuccess",
        })

        
    } catch (error) {
        dispatch({
            type : "logoutFailure",
            payload : error.response.data.message,
        })
    }
}


export const editUser = (image , name , email ) => async (dispatch)=> {
    try {

        dispatch({
            type : "editUserRequest"

        })
        
        const {data} =  await axios.put('/api/v1/update/profile' ,{image , name , email} ,  {
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "editUserSuccess",
            payload : data.message,

        })

        
    } catch (error) {
        dispatch({
            type : "editUserFailure",
            payload : error.response.data.message,
        })
    }
}

export const updatePassword = (oldpass , newpass) => async (dispatch)=> {
    try {

        dispatch({
            type : "changePasswordRequest"

        })
        
        const {data} =  await axios.put('/api/v1/update/password' ,{oldpass , newpass} ,  {
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "changePasswordSuccess",
            payload : data.message,

        })

        
    } catch (error) {
        dispatch({
            type : "changePasswordFailure",
            payload : error.response.data.message,
        })
    }
}



export const deleteAccount = () => async (dispatch)=> {
    try {

        dispatch({
            type : "deleteAccountRequest"

        })
        
        const {data} =  await axios.delete('/api/v1/delete/me');
        dispatch({
            type : "deleteAccountSuccess",
            payload : data.message,

        })

        
    } catch (error) {
        dispatch({
            type : "deleteAccountFailure",
            payload : error.response.data.message,
        })
    }
}


export const getOtherUserPosts = (id) => async(dispatch)=> {
    try {

        dispatch({
            type : "otherUserPostsRequest"
        })

        // jinha ma folow krra unki post
        const {data} = await axios.get(`/api/v1/userposts/${id}`);
        dispatch({
            type : "OtherUserPostsSuccess",   
            payload : data.posts // res.send ma success and post array hai       
        })

    } catch (error) {
        dispatch({
            type : "OtherUserPostsFailure",
            payload : error.response.data.message,
        })
    }
}

export const getOtherUserProfile = (id) => async (dispatch)=> {
    try {

        dispatch({
            type : "otherUserProfileRequest"      // loading :true 
        })
        
        const {data} = await axios.get(`/api/v1/user/${id}`);
        
        dispatch({
            type : "otherUserProfileSuccess",      // loading :false 
            payload : data.user       // data ma - success , user
        })

        
    } catch (error) {
        dispatch({
            type : "otherUserProfileFailure",      // loading :false 
            payload : error.response.data.message,
        })
    }
};

