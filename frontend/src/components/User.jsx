import { Avatar ,Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styling/home.scss'



const User = ({userId , name , avatar , hideMe}) => {
  const myid = useSelector((state)=>state.user.user._id)
  
  if (myid === userId && hideMe) {
    return (null);
  } else {
    return (
  
  
      
        <Link to={`/user/${userId}`} className='homeUser'  >
            <Avatar boxSizing='border-box' src={avatar} alt={name} />
            <Text marginLeft={'10px'}>{name}</Text>
        </Link>
    )
    
  }

}

export default User