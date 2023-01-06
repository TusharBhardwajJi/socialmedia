import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {Link, useParams} from 'react-router-dom'
import { resetPassword } from '../actions/post';

const ResetPassword = () => {

    const [password , setPassword] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    
  
    const {loading  , error , message} = useSelector((state)=>state.like);
    
    const resetPassHandler = async () => {
        await dispatch(resetPassword(params.token , password));
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
    <Container maxH={'container.xl'}  h={['150vh','100vh']} p={['6' , '16']}  >
      <form  >
          <VStack alignItems={'stretch'} w={['full' , '96']} m='auto'  my='16' spacing={'8'}>
              <Heading>new password</Heading>

              <VStack>
              <Input required type={'text'} isRequired='true' placeholder={'new Password'} focusBorderColor={'purple.400'} value={password} onChange={(e)=> setPassword(e.target.value) } />
              <Button alignSelf={'flex-end'} variant='link' color={'purple.200'}  >
                    <Link to={'/forgot/password'} > get link again!</Link>
                </Button>
                </VStack>
              
                <VStack alignItems={'stretch'}  >
              <Button colorScheme={'purple'} disabled={loading} onClick={resetPassHandler} >reset</Button>
                <Link to='/' >
                <Button w='full' outline={'purple'} >login</Button>
                </Link>
                </VStack>
          </VStack> 
      </form>
    </Container>
  )
}

export default ResetPassword