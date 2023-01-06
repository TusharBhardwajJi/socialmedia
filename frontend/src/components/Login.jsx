import { Button, Container, Heading, Input, VStack, Text, InputGroup, InputRightElement  } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";

import { useDispatch, useSelector} from "react-redux"
import { loginUser } from '../actions/user';
import { useAlert } from 'react-alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Login = () => {

    const [email ,setemail] = useState('');
    const [password ,setpassword] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();
    const [show , setShow] = useState(false);



    const {error} = useSelector((state) => state.user)
    const {message} = useSelector((state) => state.like)
    
    

    const loginHandler=  (e) => {
        e.preventDefault(); // no page reload
         dispatch(loginUser(email , password));

         
    };

    const showPassHandler = () => setShow(!show);

    useEffect(() => {
  
        if(error){
          alert.error(error);
          dispatch({type : "clearErrors"});
        }
        if(message){
          alert.success(error);
          dispatch({type : "clearMessage"});
        }

        
      }, [ alert,dispatch ,error , message] )

  return (
    <Container maxH={'container.xl'}  h={['150vh','100vh']} p={['6' , '16']} >
        <form onSubmit={loginHandler} >
            <VStack alignItems={'stretch'} w={['full' , '96']} m='auto'  my='16' spacing={'8'}>
                <Heading>Welcome</Heading>
                <Input required type={'email'}  placeholder={'email'} focusBorderColor={'purple.400'} value={email} onChange={(e)=> setemail(e.target.value) } />
                

                
          <InputGroup>
            <Input required type={ show ? "text" : 'password'} focusBorderColor={'purple.400'} placeholder='password' value={password}  onChange={(e) => setpassword(e.target.value)}  ></Input>
            <InputRightElement><Text onClick={showPassHandler}  fontSize={"20px !important" }>
                {show ? <AiFillEye/> : <AiFillEyeInvisible/> }
              </Text></InputRightElement>
          </InputGroup>


                <Button alignSelf={'flex-end'} variant='link' color={'purple.200'} >
                    <Link to={'/forgot/password'} > Forget password?</Link>
                </Button>
                
                <Button colorScheme={'purple'} type={'submit'} >Login</Button>
                

                <Text textAlign={'right'} >new user?{'  '}
                    <Button   variant='link' colorScheme={'purple.500'} color={'purple.200'} >
                        <Link to={'/register'} > Register now</Link>
                    </Button>
                </Text>
            </VStack> 
        </form>
    </Container>
  )
}

export default Login