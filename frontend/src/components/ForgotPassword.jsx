import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { forgotPassword } from '../actions/post';

const ForgetPassword = () => {

  const [email , setemail] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();


  const {loading  , error , message} = useSelector((state)=>state.like);

  const forgotPassHandler = () => {
    dispatch(forgotPassword(email));
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

    
  }, [ alert,dispatch ,error , message] )


  return (
    <Container maxH={'container.xl'}  h={['150vh','100vh']} p={['6' , '16']} >
      <form  >
          <VStack alignItems={'stretch'} w={['full' , '96']} m='auto'  my='16' spacing={'8'}>
              <Heading>Forgot password</Heading>
              <Input required type={'email'} isRequired='true' placeholder={'email'} focusBorderColor={'purple.400'} value={email} onChange={(e)=> setemail(e.target.value) } />
              
              <Button colorScheme={'purple'} disabled={loading} onClick={forgotPassHandler} >send link</Button>

          </VStack> 
      </form>
    </Container>
  )
}

export default ForgetPassword