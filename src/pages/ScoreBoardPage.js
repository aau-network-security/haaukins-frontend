import { Box, Center, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { SlGraph } from "react-icons/sl";
import ScoreTable from "../components/scoreboard/SolveTable";

export default function ScoreBoardPage() {
  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={SlGraph} />
          <Text marginLeft="20px">Scoreboard</Text>
        </Center>
      </Box>
      <Box h="300px">

      </Box>
      <Box
        marginBottom="100px"
      >
        <Center>
          <ScoreTable />
        </Center>
      </Box>
    </Flex>
  );
}
