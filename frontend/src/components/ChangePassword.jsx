import { Button, Container, Heading, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../actions/user';

import { useAlert } from 'react-alert'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const ChangePassword = () => {

    const [oldpass , setOldpass] = useState('');
    const [newpass , setNewpass] = useState('');
    const [showOld , setShowOld] = useState(false);
    const [showNew , setShowNew] = useState(false);




    const {loading , error , message} = useSelector((state) => state.like)
    const alert = useAlert();

    const dispatch = useDispatch();

    const changeHandler = async (e) => {
        e.preventDefault();
        await dispatch(updatePassword(oldpass  ,newpass));
    }

    const OldpassHandler = () => setShowOld(!showOld);
    const NewpassHandler = () => setShowNew(!showNew);

    useEffect(() => {
  
      if(error){
        alert.error(error);
        dispatch({type : "clearErrors"});
      }
      
      if(message){
        alert.success(message);
        dispatch({type : "clearMessage"});
      }
      
    }, [ alert , message, dispatch ,error] )

  return (
    <Container w='container.xl'  h={['150vh','100vh']} p={['6' , '16']}>
    <form onSubmit={changeHandler}>
       <VStack alignItems={'stretch'} w={['full' , '96']} m='auto'  my='8' spacing={'8'}> 
          <Heading  > change password</Heading>
          <InputGroup>
            <Input required type={ showOld ? "text" : 'password'} focusBorderColor={'purple.400'} placeholder='OLD password' value={oldpass} onChange={(e) => setOldpass(e.target.value)}  ></Input>
            <InputRightElement><Text onClick={OldpassHandler}  fontSize={"20px !important" }>
                {showOld ? <AiFillEye/> : <AiFillEyeInvisible/> }
              </Text></InputRightElement>
          </InputGroup>

          <InputGroup>
            <Input required type={ showNew ? "text" : 'password'} focusBorderColor={'purple.400'} placeholder='NEW password' value={newpass} onChange={(e) => setNewpass(e.target.value)}  ></Input>
            <InputRightElement><Text onClick={NewpassHandler}  fontSize={"20px !important" }>
                {showNew ? <AiFillEye/> : <AiFillEyeInvisible/> }
              </Text></InputRightElement>
          </InputGroup>

          <Button type='submit' disabled={loading}  colorScheme={'purple'} > Update </Button>
        </VStack>
    </form>
    </Container>
  )
}

export default ChangePassword