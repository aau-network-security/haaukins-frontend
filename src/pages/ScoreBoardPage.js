import { Box, Center, Flex, Text, Icon } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SlGraph } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import ScoreGraph from "../components/scoreboard/ScoreGraph";
import ScoreTable from "../components/scoreboard/SolveTable";
import { fetchScores } from "../features/scores/scoreSlice";

export default function ScoreBoardPage() {
  const eventinfo = useSelector((state) => state.event.eventinto)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchScores(eventinfo));
  }, [dispatch]);
  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={SlGraph} />
          <Text marginLeft="20px">Scoreboard</Text>
        </Center>
      </Box>
      <Box h="500px">
        <ScoreGraph/>
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
