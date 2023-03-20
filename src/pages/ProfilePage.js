import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { RiUserLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

export default function ProfilePage() {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam)

  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={RiUserLine} />
          <Text marginLeft="20px">{loggedInTeam.username}</Text>
        </Center>
      </Box>
    </Flex>
  )
}