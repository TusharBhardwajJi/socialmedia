import { Button, Container, Heading, Input, VStack, Text, Avatar, InputGroup, InputRightElement  } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { registerUser } from '../actions/user';
import '../styling/register.scss'

const Register = () => {

    const [image ,  setImage] = useState(null);
    const [name ,  setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [show , setShow] = useState(false);


    const {loading, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const alert = useAlert();

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

    const showPassHandler = () => setShow(!show);


    const registerHandler = async (e) => {
        e.preventDefault();
        await dispatch(registerUser(image , name , email , password));
        
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch({ type: "clearErrors" });
        }
      }, [dispatch, error, alert]);
    

  return (
    <Container maxH={'container.xl'} h={['150vh','100vh']} p={['6' , '16']} >
        <form>
            <VStack alignItems={'stretch'} w={['full' , '96']} m='auto'  my='4' spacing={'5'}>
                <Heading alignSelf={'center'} >Register</Heading>

                <Avatar src={image} alignSelf={'center'} h={'100px'} w={'100px'}/>
                <Input type={'file'} accept='image/*' onChange={handleImageChange}  />

                

                <Input required type={'text'} placeholder={'name'}focusBorderColor={'purple.400'} 
                    value={name} onChange={(e) => setName(e.target.value)} />
                <Input required type={'email'} placeholder='email' focusBorderColor={'purple.400'} 
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <InputGroup>
                    <Input required type={ show ? "text" : 'password'} focusBorderColor={'purple.400'} placeholder='password' value={password}  onChange={(e) => setPassword(e.target.value)}  ></Input>
                    <InputRightElement><Text onClick={showPassHandler}  fontSize={"20px !important" }>
                        {show ? <AiFillEye/> : <AiFillEyeInvisible/> }
                    </Text></InputRightElement>
                </InputGroup>
                
                <Button disabled={loading} colorScheme={'purple'} type={'submit'} onClick={registerHandler}>Register</Button>

                <Text textAlign={'right'} >already a user?{'  '}
                    <Button   variant='link' colorScheme={'purple.500'} color={'purple.200'} >
                        <Link to={'/'} > Login Here</Link>
                    </Button>
                </Text>
            </VStack> 
        </form>
    </Container>
  )
}

export default Register