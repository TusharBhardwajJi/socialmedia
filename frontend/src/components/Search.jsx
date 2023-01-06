import { Container, Heading, Input, InputGroup, InputRightElement, VStack , Text, Box} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/user';
import "../styling/search.scss";
import Loader from './Loader';
import User from './User';

const Search = () => {
    const dispatch = useDispatch();

    const [name , setName] = useState('');
    const {loading:usersLoading , users} = useSelector(state => state.allUsers)


    const searchHandler = (e) => {
        e.preventDefault();
        dispatch(getAllUsers(name));
    }

  return ( 
    usersLoading === true || usersLoading === undefined ? <Loader/> :
    <>
    <Container maxH={'container.xl'}  p={['6' , '9']} >
        {/* <form onSubmit={searchHandler} > */}
            <VStack alignItems={'stretch'} w={['full' , '96']} m='auto'  spacing={'8'}>
                <Heading>search user</Heading>
                <InputGroup>
                    <Input required type={'name'}  placeholder={'user name'} focusBorderColor={'purple.400'}
                         value={name}  onChange={(e)=> setName(e.target.value) } />
                    <InputRightElement>
                        < Text  onClick={searchHandler}  ><AiOutlineSearch  /></Text>
                    </InputRightElement>
                </InputGroup>
            </VStack> 
        {/* </form> */}


        
    </Container>
    <Container maxW={'container.xl'} overflowY={'auto'} >
        <Box display={'grid'} gridTemplateColumns={'1fr 1fr'}  >
            {
                users && users.length > 0 ? (
                    users.map((user) => (
                                <User key={user._id + '1'} userId={user._id} name={user.name} avatar={user.avatar.url} hideMe={true} />  

                    ))
                ): <Text>no user found</Text> 
            }
        </Box>
    </Container>
        </>
  )
}

export default Search