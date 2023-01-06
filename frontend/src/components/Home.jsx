import React, { useEffect } from 'react'
import "../styling/home.scss"
import User from "./User"
import Post from "./Post"
import Loader from "./Loader";
import {useDispatch, useSelector} from "react-redux"
import { getAllUsers, getfollowingPosts } from '../actions/user'
import { Heading, Text } from '@chakra-ui/react';
import { useAlert } from 'react-alert'

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { FaUsers } from 'react-icons/fa';





const Home = () => {
  
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isOpen, onOpen, onClose } = useDisclosure()


  const {loading ,posts ,error} = useSelector(state => state.postOffollowing);

  const {loading:usersLoading , users} = useSelector(state => state.allUsers)

// comment ka bhi same reducer h
const {error:likeerror , message} = useSelector((state) => state.like);



useEffect( () => {
  dispatch(getfollowingPosts());
  dispatch(getAllUsers());
  // dispatch(getMyPosts());

}, [dispatch])


useEffect(() => {
  
  if(error){
    alert.error(error);
    dispatch({type : "clearErrors"});
  }
  
  if(likeerror){
    alert.error(likeerror);
    dispatch({type : "clearErrors"});
  }
  if(message){
    alert.success(message);
    dispatch({type : "clearMessage"});
  }
  
}, [alert , likeerror , message, dispatch ,error] )





  


    
return loading===true || loading===undefined || usersLoading===true || usersLoading===undefined  ? <Loader/> : (
        <div className='home'>
        <div className="homeleft">
            {
              posts && posts.length >0 ? ( posts.map((i) => (
                <Post key={i._id} postId={i._id} caption={i.caption} 
                postImg={i.image.url} 
                // postImg={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yZWpRimEtiBIKnAW27aisWfE3Hv56XX1zQ&usqp=CAU"} 
                likes={i.likes} comments={i.comments}
                 ownerImg={i.owner.avatar.url} 
                //  ownerImg={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yZWpRimEtiBIKnAW27aisWfE3Hv56XX1zQ&usqp=CAU"} 
                 ownerName={i.owner.name} 
                  ownerId={i.owner._id} 
                  isDelete={false}
                  isAccount={false}
                   />)
              )) : <Text>No Post yet!</Text>
            }
        </div>
        <div className="homeright hr1">

            <Heading className='allUser' >All Users</Heading>
            {


              users && users.length >1 ? (
                users.map((user) => (
                <User key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} hideMe={true} />  
              ))
              ) : <Text>No user yet!</Text>


              
            }
            
        </div>

        <div className=" hr2 ">
            <Button
                pos={'fixed'}
                top={'12vh'}
                right={'4'}
                colorScheme = "purple"
                p={'0'}
                w={'8'}
                h={'8'}
                borderRadius='full'
                onClick={onOpen}
                zIndex='overlay'
            ><FaUsers/></Button>
        </div>


        <Drawer isOpen={isOpen} placement='right' onClose={onClose} >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>All Users</DrawerHeader>
                <DrawerBody>
                    <div className='homeright' >
                        {


                          users && users.length >1 ? (
                            users.map((user) => (
                            <User key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} hideMe={true} />  
                          ))
                          ) : <Text>No user yet!</Text>


                          
                        }

                    </div>

                </DrawerBody>


            </DrawerContent>
        </Drawer>

    </div>
      )
    

  
}

export default Home