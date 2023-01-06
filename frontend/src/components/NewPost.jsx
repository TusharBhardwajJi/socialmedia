import React, { useEffect, useState } from 'react'
import "../styling/newPost.scss"
import {AiOutlineUpload} from "react-icons/ai"

import {useDispatch, useSelector} from "react-redux";

import {Button, Container, Heading, Input, VStack} from "@chakra-ui/react"
import { createNewPost } from '../actions/post';
import { useAlert } from 'react-alert';
import { loadUser } from '../actions/user';


const NewPost = () => {
    const [image , setImage] = useState(null);
    const [caption , setCaption] = useState("");
    
    
    
    // state.like ma hi bhod se post ka reducer call kiya hua h 
    // newPostRequest
    const {loading , error ,message} = useSelector((state) => state.like)
    
    const dispatch = useDispatch();
    const alert = useAlert();


    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () =>{
            if(Reader.readyState===2){
                setImage(Reader.result);
                // console.log(Reader.result)
            }
        }

    }

    const submitHandler =async (e) => {
        e.preventDefault();
        await dispatch(createNewPost(caption , image));
        dispatch(loadUser());

    }


    
useEffect(() => {
  
    if(error){
      alert.error(error);
      dispatch({type : "clearErrors"});
    }
    
    if(message){
      alert.success(message);
      dispatch({type : "clearMessage"});
    }
    
  }, [alert , message, dispatch ,error] )
  

    return (
        
        <Container  h={['150vh','100vh']} p={['6' , '16']} >
        <form onSubmit={submitHandler} >
            <VStack w={['full' , '96']} m='auto' spacing={'8'}>
                <Heading>New Post</Heading>
                {image && <img src={image} alt='post' />}
                <Input type={'file'} accept='image/*' onChange={handleImageChange}  />

                <Input type={'text'} placeholder='caption...' focusBorderColor={'purple.400'}  value={caption} onChange={(e)=> setCaption(e.target.value)} />
                
                <Button disabled={loading} colorScheme={'purple'} type={'submit'} > <AiOutlineUpload/> upload</Button>

            </VStack> 
        </form>
    </Container>
  )
}

export default NewPost