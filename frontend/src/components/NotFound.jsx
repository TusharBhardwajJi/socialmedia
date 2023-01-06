import React from 'react'
import {Box, Button, Heading, Text} from '@chakra-ui/react'
import { BiError } from 'react-icons/bi'
const NotFound = () => {


  return (
    <Box display={'grid'}  alignItems={'center'} justifyContent='center' height={'60vh'} >
      
      <Box textAlign='center' >
      <Heading display={'flex'}> <Text margin={'6px'} > <BiError /></Text> error 404 </Heading> 
      <Text>page not found</Text>
      <a href='/' textDecoration={'none !important'} ><Button  colorScheme={'purple'} marginTop='4vh' >Return to home</Button></a>
      </Box>
    </Box>
  )
}

export default NotFound