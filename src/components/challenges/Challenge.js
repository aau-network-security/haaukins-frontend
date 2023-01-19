import { Box, Button, Center, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Challenge({name, points, solved, description, solves, containerStatus}) {
  return (
    <Button 
      height="100px"
      w="100%"
      bg={solved === false ? '#211a52' : '#5caf8d'}
      _hover={solved === false ? {bg: '#18123a'} : {bg: '#4c9a79'}}
    >
      <Center w="100%" color="#dfdfe3" fontWeight="400" fontFamily="'Audiowide', cursive">
        <VStack spacing="15px">
          <Text 
            w="100%" 
            whiteSpace="pre-line" 
            wordBreak="break-word" 
            fontSize="14px" 
          >
            {name}
          </Text>
          <Text
            fontSize="16px"
          >
            {points}
          </Text>
        </VStack>
        
      </Center>
      
      
    </Button>
  )
}
