import { Center, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'

export default function Footer() {
  return (
    <Flex w="100%" h="60px" position="absolute" bottom="0" lineHeight="60px">
        <Center w="100%">
            <Text>
                Powered by{' '}
                <Link href="https://github.com/aau-network-security/haaukins-daemon" color="#54616e" target="_blank">Haaukins</Link>
                {' '}at Aalborg University
            </Text>
        </Center>
    </Flex>
  )
}
