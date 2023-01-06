import React from 'react'

import {Box, Spinner} from '@chakra-ui/react'

const Loader = () => {
  return (
    <Box display='flex'  justifyContent={'center'} alignItems='center' h='60' w='100%'  > 
  
        <Spinner size='xl' />
    </Box>
  )
}

export default Loader