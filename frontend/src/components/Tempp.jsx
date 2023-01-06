import React, { useState } from 'react'
import '../styling/account.scss'
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import { deleteAccount, editUser, getMyPosts, loadUser, logoutUser } from '../actions/user';
import Loader   from "./Loader";
import Post from './Post';
import { Avatar, Box, Button, HStack, IconButton, Input, MenuDivider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import {RiLockPasswordLine} from 'react-icons/ri'
import { useAlert } from 'react-alert'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { AiFillDelete, AiOutlineEdit, AiOutlineMenu } from 'react-icons/ai';
import User from './User';
import { Link } from 'react-router-dom';

const Tempp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  
  const {user , loading : userLoading} = useSelector((state) =>state.user);
  const {loading , posts ,error} = useSelector((state) => state.myPosts);
  const {error:likeerror , message} = useSelector((state) => state.like);

  
  const {isOpen : isfollowerOpen , onOpen : onfollowerOpen, onClose: onfollowerClose } = useDisclosure();
  const {isOpen : isfollowingOpen , onOpen : onfollowingOpen, onClose: onfollowingClose } = useDisclosure();
  const {isOpen : isEditNameOpen , onOpen : onEditNameOpen, onClose: onEditNameClose } = useDisclosure();
  const {isOpen : isEditEmailOpen , onOpen : onEditEmailOpen, onClose: onEditEmailClose } = useDisclosure();
  const {isOpen : isEditImageOpen , onOpen : onEditImageOpen, onClose: onEditImageClose } = useDisclosure();
  const {isOpen : isDelAccOpen , onOpen : onDelAccOpen, onClose: onDelAccClose } = useDisclosure();
  
  
    
  
  
    const logoutHandler = async () => {
      await dispatch(logoutUser());
      alert.success("logout successfully")
    }

    const [newName , setName] = useState(user.name); 
    const [newEmail , setEmail] = useState(user.email); 
    const [newImage , setImage] = useState(user.avatar.url); 



    const handleImageChange = (e) =>{
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      
      Reader.onload = () =>{
        if(Reader.readyState===2){
          setImage(Reader.result);
        }
      }
      
    }
    
    const editHandler = async (e) => {
      e.preventDefault();
      await dispatch(editUser(newImage , newName , newEmail));
      dispatch(loadUser());
    }
    
    
    const deleteAccHandler = async () => {
      await dispatch(deleteAccount());
      dispatch(logoutUser());
    }
    
    
    useEffect(() => {
      dispatch(getMyPosts());
    },[dispatch] )
    
    
    
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
      
    }, [ alert,likeerror , message, dispatch ,error] )


    
    return loading===true || userLoading===true ? <Loader/> : (
      <div className="account">
        <div className="accountleft">
          {
            posts && posts.length >0 ? ( posts.map((i) => (
              <Post key={i._id}
                postId={i._id} 
                caption={i.caption} 
                postImg={i.image.url} 
                // postImg={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yZWpRimEtiBIKnAW27aisWfE3Hv56XX1zQ&usqp=CAU"} 
                likes={i.likes} 
                comments={i.comments}
                 ownerImg={i.owner.avatar.url} 
                // ownerImg={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yZWpRimEtiBIKnAW27aisWfE3Hv56XX1zQ&usqp=CAU"} 
                ownerName={i.owner.name} 
                  ownerId={i.owner._id}  
                  isDelete={true}
                  isAccount={true}
              />)
            )) : <Text>No Post yet!</Text>
          }

        </div>
        <div className="accountright">
          <VStack spacing={4} marginTop='5rem' >
            <Avatar h={"5rem"} w='5rem' border="2px solid purple"  src={user.avatar.url} alt={user.name}/>
              <Text marginTop={"-3px !important"} fontSize={"2rem"} >{user.name} </Text>
            <HStack spacing={5} marginTop={"4vh !important" }>
              <Button onClick={onfollowerOpen} >{user.followers.length} Followers</Button>
              <Button onClick={onfollowingOpen}>{user.following.length} Following</Button>
            </HStack>
              <Text  fontSize={"1.3rem"} >Posts : {user.posts.length} </Text>
              <Button position={'absolute'}  bottom='6vh' colorScheme={"red"} onClick={logoutHandler} > Logout </Button>
          </VStack>

          <Box position={'absolute'} top='6vh' >
          <Menu >
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<AiOutlineMenu />}
              variant='outline'
            />
            <MenuList >
                {/* <Button to={'/update/profile'} > */}
                  
                   <Accordion allowMultiple className='accordion' >
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' display={'flex'}>
                               <Text margin={'4px 10px 0 -4px'} ><AiOutlineEdit /> </Text> edit profile
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel  className='editBtn' >
                            <Button onClick={onEditImageOpen} >Profile pic</Button>
                            <Button  onClick={onEditNameOpen}  >Name</Button>
                            <Button   onClick={onEditEmailOpen} >Email</Button>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  {/* <MenuItem icon={<AiOutlineEdit/>} >edit profile</MenuItem> */}
                {/* </Button> */}
                {/* <Button to={'/update/password'} > */}
                <Link to='/update/password'>
                  <MenuItem icon={<RiLockPasswordLine/>} > change Password </MenuItem>
                  </Link>
                {/* </Button> */}
                <MenuDivider/>
                {/* <Button> */}
                  <MenuItem icon={<AiFillDelete color='#ff294e'/>} onClick={onDelAccOpen} >
                    Delete Account
                  </MenuItem>
                {/* </Button> */}
            </MenuList>
          </Menu>
          </Box>
        </div>


        {/* /////////////////////////// modals for edit //////////////////////// */}


         <Modal isOpen={isEditNameOpen} onClose={onEditNameClose} > 
           <ModalOverlay/>
           <ModalContent>
            
             <ModalHeader> New Name</ModalHeader>
             <ModalCloseButton onClick={onEditNameClose} />

             <ModalBody>
             <form onSubmit={editHandler}>
               <Input required value={newName} onChange={(e) => setName(e.target.value)} ></Input>
               <Button type='submit' onClick={onEditNameClose} > update</Button>
               </form>
             </ModalBody>

             <ModalFooter>

             </ModalFooter>
           </ModalContent>
        </Modal>

         <Modal isOpen={isEditEmailOpen} onClose={onEditEmailClose} > 
           <ModalOverlay/>
           <ModalContent>
            
             <ModalHeader> New Email</ModalHeader>
             <ModalCloseButton onClick={onEditEmailClose} />

             <ModalBody>
              <form onSubmit={editHandler}>
                <Input required value={newEmail} onChange={(e) => setEmail(e.target.value)}  ></Input>
                <Button type='submit' onClick={onEditEmailClose} > update</Button>
               </form>
             </ModalBody>

             <ModalFooter>

             </ModalFooter>
           </ModalContent>
        </Modal>

         <Modal isOpen={isEditImageOpen} onClose={onEditImageClose} > 
           <ModalOverlay/>
           <ModalContent>
            
             <ModalHeader> New Image</ModalHeader>
             <ModalCloseButton onClick={onEditImageClose} />

             <ModalBody>

              <form onSubmit={editHandler}>
              <Avatar src={newImage} alignSelf={'center'} h={'100px'} w={'100px'}/>
                <Input type={'file'} accept='image/*' onChange={handleImageChange}  />
                <Button type='submit' onClick={onEditImageClose}  > update</Button>
              </form>
             </ModalBody>

             <ModalFooter>

             </ModalFooter>
           </ModalContent>
        </Modal>





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
                  <User key={i._id + "1"} userId={i._id} name={i.name} avatar={i.avatar.url} hideMe={false} />
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
                  <User key={i._id} userId={i._id} name={i.name} avatar={i.avatar.url} hideMe={false} />
                ))
              ) : <Text>Not following anyone yet!</Text>
              
            }
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* //////////// delete account Modal /////////// */}


      <Modal isOpen={isDelAccOpen} onClose={onDelAccClose} > 
        <ModalOverlay/>
        <ModalContent>
          
          <ModalHeader>followers</ModalHeader>
          <ModalCloseButton onClick={onDelAccClose} />

          <ModalBody>
            <VStack>
              <Text>Are You Confirm ? </Text>
              <HStack>
                <Button colorScheme={"green"} onClick={onDelAccClose} >No</Button>
                <Button colorScheme={"red"}  onClick={deleteAccHandler} >Yes</Button>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>

      </div>
    )
   
  
}

export default Tempp