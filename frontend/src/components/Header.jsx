import React, { useState } from 'react'
import {Box} from '@chakra-ui/react'
import {AiOutlineHome, AiOutlineSearch} from 'react-icons/ai'
import { FaUserCircle } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { Link } from 'react-router-dom'
import '../styling/header.scss'

const Header = () => {
  const [tab, settab] = useState(window.location.pathname);
  return (
    
    <Box className='header' shadow={'lg'} >
      <Link to='/' onClick={() => settab('/')} >
        {
          tab === '/' ? <Box ><AiOutlineHome/></Box>  : <AiOutlineHome/>
        }
      </Link>

      <Link to='/newpost' onClick={() => settab('/newpost')}>
        {
          tab === '/newpost' ? <Box ><HiOutlinePlus/></Box>  : <HiOutlinePlus/>
        }
      </Link>

      <Link to='/search' onClick={() => settab('/search')}>
        {
          tab === '/search' ? <Box ><AiOutlineSearch/></Box>  : <AiOutlineSearch/>
        }
      </Link>

      <Link to='/account' onClick={() => settab('/account')}>
        {
          tab === '/account' ? <Box ><FaUserCircle/></Box>  : <FaUserCircle/>
        }
      </Link> 

    </Box>
  )
}

export default Header