import {  Avatar, Box, Button, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUserPosts, getOtherUserProfile, loadUser } from '../actions/user';
import {useParams} from 'react-router-dom'
import Post from './Post';
import User from './User';
import Loader from './Loader';
import { useAlert } from 'react-alert';
import { follow_N_unfollow } from '../actions/post';
import '../styling/userInfo.scss'

const UserInfo = () => {    

    const dispatch = useDispatch();
    const alert = useAlert();
    

    const {loading, user , error } = useSelector((state)=>state.userProfile);
    const {loading:postLoading, posts, error : postError} = useSelector((state)=>state.otherUserPosts );
    const {loading:followLoading , message , error:followError} = useSelector((state) => state.like);
    const {user : me} = useSelector((state)=>state.user );
    
    const [isfollow , setfollow] = useState(false);

    const {isOpen : isfollowerOpen , onOpen : onfollowerOpen, onClose: onfollowerClose } = useDisclosure();
    const {isOpen : isfollowingOpen , onOpen : onfollowingOpen, onClose: onfollowingClose } = useDisclosure();
    
    const params = useParams();

    const followHandler = async () => {
      await dispatch(follow_N_unfollow(user._id));
      setfollow(!isfollow);
      dispatch(loadUser());
    }
    
    useEffect(() => {
      dispatch(getOtherUserProfile(params.id));
      dispatch(getOtherUserPosts(params.id));


      
    }, [params.id , dispatch])

    useEffect(() => {
      if(user){
        user.followers.forEach(item => {
          if(item._id === me._id){
            setfollow(true);
          }else{
            setfollow(false);
          }
        });
      }
      
    }, [user, me._id])

    

    useEffect(() => {
  
        if(error){
          alert.error(error);
          dispatch({type : "clearErrors"});
        }
        
        if(postError){
          alert.error(postError);
          dispatch({type : "clearErrors"});
        }
        if(followError){
          alert.error(followError);
          dispatch({type : "clearErrors"});
        }
        if(message){
          alert.success(message);
          dispatch({type : "clearMessage"});  
        }

      }, [ alert,postError , dispatch ,error , message , followError] )


  
    return  loading===undefined || loading===true || postLoading===undefined || postLoading===true  ? <Loader/> : (
<Box>
    <Box  minH={20} p={['0', '0' , '8']}  display={'flex'} flexDirection='column' className='baapDiv' >
        <HStack shadow='md'  className='mainDiv' spacing={['0' ,'4', '10']} >
            <VStack className='avatarDiv' >
                    <Avatar className='img' src={user.avatar.url} h='8rem' w='8rem' />
            </VStack>
            <VStack  spacing='8' alignItems='start'  >
                <Box >
                    <Heading >{user.name}</Heading>
                </Box>
                <HStack className='Fbtns' >
                    {
                      isfollow?  <Button onClick={followHandler} disabled={followLoading} colorScheme='gray' border='1px solid purple' >unfollow</Button> : <Button onClick={followHandler} disabled={followLoading} colorScheme='purple' >follow</Button>
                      
                    }
                    <Button onClick={onfollowerOpen}>{user.followers.length}  followers</Button>
                    <Button onClick={onfollowingOpen}>{user.following.length} following</Button>
                </HStack>
            </VStack>

        </HStack>
        <Box shadow={'lg'} textAlign={'center'} paddingY='1rem'  ><Text fontFamily={'sans-serif'} >{ posts.length} {posts.length >1 ? "posts" : "post"}</Text></Box>
        
        <Box display={'flex'} flexWrap='wrap' justifyContent={'center'} >
            {
                 posts && posts.length >0 ? ( posts.map((i) => (
                    <Post key={i._id} postId={i._id} caption={i.caption} 
                        postImg={i.image.url} 
                        likes={i.likes} comments={i.comments}
                        ownerImg={i.owner.avatar.url} 
                        ownerName={i.owner.name} 
                        ownerId={i.owner._id} 
                        isDelete={false}
                        isAccount={false}
                       />)
                  )) : <Text>user have no post yet!</Text>
            }
        </Box>


        
        {/* /////////////////////////// Modal for followers and following ///////////////////// */}


        <Modal isOpen={isfollowerOpen} onClose={onfollowerClose} > 
        <ModalOverlay/>
        <ModalContent>
          
          <ModalHeader>followers</ModalHeader>
          <ModalCloseButton onClick={onfollowerClose} />

          <ModalBody>
            { 
              
              user.followers.length >0 ? (
                user.followers.map((i) => (
                  <User key={i._id + "1"} userId={i._id} name={i.name} avatar={i.avatar} hideMe={false} />
                ))
              ) : <Text>No followers</Text>
              
            }
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isfollowingOpen} onClose={onfollowingClose} > 
        <ModalOverlay/>
        <ModalContent>
          
          <ModalHeader>followers</ModalHeader>
          <ModalCloseButton onClick={onfollowingClose} />

          <ModalBody>
            { 
              
              user.following.length >0 ? (
                user.following.map((i) => (
                  <User key={i._id} userId={i._id} name={i.name} avatar={i.avatar} hideMe={false} />
                ))
              ) : <Text>Not following anyone yet!</Text>
              
            }
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>


    </Box>

    </Box>
    
  )
}


export default UserInfo
