import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <Box bg='black' w='100%' h='100vh' p={4} color='white' overflow={'hidden'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Link to="/chatbot-dashboard">
                <Box as='button' borderRadius='md' bg='tomato' color='white' px={10} h={8}>
                    Let's Create
                </Box>
            </Link>
        </Box>
    )
}

export default WelcomePage
