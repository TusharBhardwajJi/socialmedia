import axios from "axios";

export const likePost = (id) => async(dispatch)=> {
    try {

        dispatch({
            type : "likeRequest"
        })

        // jinha ma folow krra unki post
        const {data} = await axios.get(`/api/v1/post/${id}`);
        dispatch({
            type : "likeSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "likeFailure",
            payload : error.response.data.message,
        })
    }
}

export const addCommentPost = (id,comment) => async(dispatch)=> {
    try {

        dispatch({
            type : "commentRequest"
        })

        // jinha ma folow krra unki post
        const {data} = await axios.put(`/api/v1/post/comment/${id}`, {comment},{
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "commentSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "commentFailure",
            payload : error.response.data.message,
        })
    }
}

export const delCommentPost = (id,commentId) => async(dispatch)=> {
    try {

        dispatch({
            type : "delCommentRequest"
        })

        const {data} = await axios.delete(`/api/v1/post/comment/${id}`,{
            data : {commentId},
        });
        dispatch({
            type : "delCommentSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "delCommentFailure",
            payload : error.response.data.message,
        })
    }
}


export const createNewPost = (caption , image) => async(dispatch)=> {
    try {

        dispatch({
            type : "newPostRequest"
        })

        const {data} = await axios.post(`/api/v1/post/upload`,{caption , image},{
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "newPostSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "newPostFailure",
            payload : error.response.data.message,
        })
    }
}


export const updateCaption = (id , newCaption) => async(dispatch)=> {
    try {

        dispatch({
            type : "updateCaptionRequest"
        })


        //yha newCaption hi naam hona chahiya varible ka kyui controller ma hum req.body se newCaption lere h
        const {data} = await axios.put(`/api/v1/post/${id}`,{newCaption },{
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "updateCaptionSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "updateCaptionFailure",
            payload : error.response.data.message,
        })
    }
}

export const deletePost = (id) => async(dispatch)=> {
    try {

        dispatch({
            type : "deletePostRequest"
        })


        const {data} = await axios.delete(`/api/v1/post/${id}`);
        dispatch({
            type : "deletePostSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "deletePostFailure",
            payload : error.response.data.message,
        })
    }
}


export const forgotPassword = (email) => async(dispatch)=> {
    try {

        dispatch({
            type : "forgotPasswordRequest"
        })


        const {data} = await axios.post(`/api/v1/forgot/password`, {email} ,{
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "forgotPasswordSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "forgotPasswordFailure",
            payload : error.response.data.message,
        })
    }
}


export const resetPassword = (token ,password) => async(dispatch)=> {
    try {

        dispatch({
            type : "resetPasswordRequest"
        })


        const {data} = await axios.put(`/api/v1/password/reset/${token}`, {password} ,{
            headers : {
                "Content-Type" : "application/json"
            },
        });
        dispatch({
            type : "resetPasswordSuccess",  
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "resetPasswordFailure",
            payload : error.response.data.message,
        })
    }
}

export const follow_N_unfollow = (id) => async(dispatch)=> {
    try {

        dispatch({
            type : "followRequest"
        })

        const {data} = await axios.get(`/api/v1/follow/${id}`);
        dispatch({
            type : "followSuccess",   
            payload : data.message   // {data} = {success , message}
        })

    } catch (error) {
        dispatch({
            type : "followFailure",
            payload : error.response.data.message,
        })
    }
}
