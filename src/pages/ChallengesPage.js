import { Box, Center, Flex, Icon, Text, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { FaFlagCheckered } from 'react-icons/fa'
import Challenge from '../components/challenges/Challenge'
export default function ChallengesPage() {
  
  const challenges = [
    {name: "Hey im a fucking moron thank you", solved: true, points: 1000},
    {name: "test2", solved: false, points: 1000},
    {name: "test3", solved: false, points: 1000},
    {name: "test4", solved: true, points: 1000},
    {name: "test5", solved: true, points: 1000},
    {name: "test6", solved: false, points: 1000},
    {name: "test7", solved: true, points: 1000},
    {name: "test8", solved: false, points: 1000},
    {name: "test9", solved: true, points: 1000},
    {name: "test10", solved: false, points: 1000},
    {name: "test11", solved: false, points: 1000},
    {name: "test12", solved: true, points: 1000},
  ]
  const categories = [
    {name: 'Starters', challenges: challenges},
    {name: 'Reversing', challenges: challenges},
    {name: 'Misc', challenges: challenges},
    {name: 'Binary Exploitation', challenges: challenges},
    {name: 'Web Exploitation', challenges: challenges},
  ]
  return (
    <>
      <Flex
        maxW={"1140px"}
        w="100%"
        m={"auto"}
        flexDir="column"
        color="#211a52"
      >
        <Box w="100%" marginTop="100px" marginBottom="100px">
          <Center w="100%" fontSize="75px">
              <Icon as={FaFlagCheckered} />
              <Text marginLeft="20px">Challenges</Text>
          </Center>          
        </Box>

        <Box marginBottom="100px">
        {Object.entries(categories).map(([key, category]) => (
        <Box key={key} w="100%" padding="0px 20px">
          <Text fontSize="34px">{category.name}</Text>
          <SimpleGrid 
            margin="15px 0 35px 0"
            minChildWidth="250px" 
            columns={[1, 2, 3, 4]} 
            spacing='20px'
            zIndex="100"
          >
            {Object.entries(category.challenges).map(([key, challenge]) => (
              <Challenge 
                key={key} 
                solved={challenge.solved}
                name={challenge.name}
                points={challenge.points}
              />          
            ))}
          </SimpleGrid>
        </Box>
        ))}
        </Box>
        
        
      </Flex>
    </>
  )
}

