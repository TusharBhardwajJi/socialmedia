import { Link } from 'react-router-dom';
import React from 'react'
import "../styling/commentCard.scss";
import { Button, Text ,Image, HStack, Box } from '@chakra-ui/react';
import {AiFillDelete} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { delCommentPost } from '../actions/post';
import { getfollowingPosts, getMyPosts } from '../actions/user';

const CommentCard = ({userId, name , avatar , comment , commentId , postId , isAccount}) => {


    const {user} = useSelector((state) => state.user)

    const dispatch = useDispatch();

    const deleteCommentHandler= async () => {
        await dispatch(delCommentPost(postId , commentId));
        console.log(commentId); 
        if (isAccount) {
            dispatch(getMyPosts());
        }else{
            // essa agar kuch bhi krte h - like , comment , deleteComment to direct reload krne ka liya
            // vapis sare post dekha dega
            dispatch(getfollowingPosts());
        }

    }



  return (

      
            <div>
                    <HStack  className='commentHead' >
                <Link to={`/user/${userId}`} >
                        <Image src={avatar} alt={name} />
                        <Text >{name} : </Text> 
                </Link>
                        <Text className='comment' >{comment}</Text>
                        <Box position={"absolute"} right='0'>

                            {
                                isAccount ? ( 
                                <Button className='btn' onClick={deleteCommentHandler} background={"none"} ><AiFillDelete/></Button>) : userId===user._id ? ( 
                                <Button className='btn' onClick={deleteCommentHandler} background={"none"} ><AiFillDelete/></Button>) : null
                            }
                            
                        </Box>

                    </HStack>

            </div>



    // <div className='commentUser' >
    //     <Link to={`/user/${userId}`}  >
    //         <img src={avatar} alt={name} />
    //         <Text minWidth={"6vmax"}>{name}</Text>
    //     </Link>
    //     <Text>{comment}</Text>
    // </div>
  )
}

export default CommentCard