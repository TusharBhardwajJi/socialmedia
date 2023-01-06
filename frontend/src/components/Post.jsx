import React, { useEffect, useState } from 'react'
import {Avatar, Button, Text , Modal, ModalHeader, ModalOverlay, ModalBody, ModalFooter, useDisclosure, ModalContent, ModalCloseButton, Input, Box} from "@chakra-ui/react"
import "../styling/post.scss"
import { Link } from 'react-router-dom'
import { AiFillLike, AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import { addCommentPost, deletePost, likePost, updateCaption } from '../actions/post'
import { getfollowingPosts, getMyPosts, loadUser } from '../actions/user'
import User from './User'
import CommentCard from './CommentCard'


const Post = ({postId , caption , postImg , likes=[] , comments=[] , ownerImg , ownerName , ownerId, isDelete, isAccount}) => {

const {isOpen : islikeOpen , onOpen : onlikeOpen, onClose: onlikeClose } = useDisclosure();
const {isOpen : iscommentOpen , onOpen : oncommetOpen, onClose: oncommentClose } = useDisclosure();
const {isOpen : iscaptionOpen , onOpen : oncaptionOpen, onClose: onccaptionClose } = useDisclosure();

const [liked, setliked] = useState(false);
const [commentValue, setcommentValue] = useState("");
const [newCaption, setnewCaption] = useState("");

const dispatch = useDispatch();

const {user} = useSelector((state) => state.user)





      const likeHandler= async () =>{
        setliked(!liked);
        await dispatch(likePost(postId));

        if (isAccount) {
          dispatch(getMyPosts());
        }else{
          dispatch(getfollowingPosts());
        }

      }

      const addCommentHandler = async (e) => {
        e.preventDefault();
        // console.log(commentValue , postId);
        await dispatch(addCommentPost(postId, commentValue));
        

                    // essa agar kuch bhi krte h - like , comment , deleteComment to direct reload krne ka liya
                  // vapis sare post dekha dega
        if (isAccount) {
          dispatch(getMyPosts());
        }else{
          dispatch(getfollowingPosts());
        }
      }


      
      const updateCaptionHandler = async () => {
        await dispatch(updateCaption(postId , newCaption));
        dispatch(getMyPosts());
        
      }
      
      const postDeleteHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
      }
      
      useEffect(() => {
        likes.forEach(item=>{
          if(item._id===user._id){
            setliked(true);
          }
        })
      }, [likes ,user._id ])


  return (
    <div className="post">
      <div className="postHeader">
        {
          isAccount ? (
            <Button onClick={oncaptionOpen} ><HiDotsVertical/></Button>
          ) : null
        }
      </div>
      <img src={postImg} alt="post" />
      <div className="postDetails">
        <Avatar src={ownerImg} alt="user"  className='avatar' />
        <Link to={`/user/${ownerId}`} >
          <Text fontWeight={700} >{ownerName}</Text>
        </Link>

        <Text fontWeight={100} alignSelf={'center'} >
          {caption}
        </Text>

      </div>

      <Button colorScheme={'purple' } onClick={onlikeOpen} disabled={likes.length===0?true : false} >
        <Text>{likes.length} Likes</Text>
      </Button>

      <div className="postFooter">
        <Button onClick={likeHandler}>

          {
            liked===true ? < AiFillLike color='purple'/> : < AiOutlineLike/>
          }
          
        </Button>
        <Button onClick={oncommetOpen} >
          <FaRegComment/>
        </Button>
        <Button>
          {
            isDelete ? <AiOutlineDelete color='red' onClick={postDeleteHandler}  /> : null
          }
          
        </Button>
      </div>
      
      
      <Modal isOpen={islikeOpen} onClose={onlikeClose} > 
        <ModalOverlay/>
        <ModalContent>
          
          <ModalHeader>Liked By</ModalHeader>
          <ModalCloseButton onClick={onlikeClose} />

          <ModalBody>
            {
              likes.map((i) => (
                <User key={i._id} userId={i._id} name={i.name} avatar={i.avatar} hideMe={false} />
              ))
            }
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={iscaptionOpen} onClose={onccaptionClose} > 
        <ModalOverlay/>
        <ModalContent>
          
          <ModalHeader>new caption</ModalHeader>
          <ModalCloseButton onClick={onccaptionClose} />

          <ModalBody>
            <Input type={'text'} placeholder='new caption..' value={newCaption} onChange={(e) => setnewCaption(e.target.value)} />
            <Button onClick={updateCaptionHandler} > update </Button>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
      

      {/* commmet modal */}

      <Modal isOpen={iscommentOpen} onClose={oncommentClose} > 
        <ModalOverlay/>
        <ModalContent>
          
          <ModalHeader>Comments By</ModalHeader>
          <ModalCloseButton onClick={oncommentClose} />

          <ModalBody className='commentDiv' >


            <Box  maxH={"60vh"} overflow='auto' >


            {
              comments.length >0 ? (
                comments.map((i) => (
                  <CommentCard key={i._id} userId={i.user._id} name={i.user.name} avatar={i.user.avatar.url} comment={i.usercomment} commentId={i._id} postId={postId} isAccount={isAccount} />
                  
                  ))
                  ) : <Text>No comments!</Text>
            }

            </Box>

            
          </ModalBody>

          <ModalFooter>
          <Box width={'full'} position={'sticky'} bottom={0} paddingBottom='2vh' >
            
            <form className='commentForm' onSubmit={addCommentHandler} >
              <Input type="text" value={commentValue} onChange={(e)=>setcommentValue(e.target.value)} placeholder="Comment.." required  />
 
              <Button type='submit'  colorScheme={'gray'} ><BiSend/></Button>
            </form>

            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default Post