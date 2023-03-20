import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react'
import { FaQuestion } from "react-icons/fa"
import React from 'react'

export default function FaqPage() {
  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={FaQuestion} />
          <Text marginLeft="20px">FAQ</Text>
        </Center>
      </Box>
    </Flex>
  )
}
