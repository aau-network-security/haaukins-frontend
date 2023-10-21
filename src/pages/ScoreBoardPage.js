import { Box, Center, Flex, Text, Icon, Select, Checkbox } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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

  const [time, setTime] = useState(Date.now());
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false)
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(5000)
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), autoRefreshInterval);
    return () => {
      clearInterval(interval);
    };
  }, [autoRefreshInterval]);

  useEffect(() => {
    if (autoRefreshEnabled) {
      dispatch(fetchScores(eventinfo))
    }
  }, [time, autoRefreshEnabled])

  const onCheckChange = (e) => {
    console.log(e)
    setAutoRefreshEnabled(e.target.checked)
  }

  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={SlGraph} />
          <Text marginLeft="20px">Scoreboard</Text>
        </Center>
      </Box>
      <Text><b>Auto Refresh</b></Text>
      <Flex>
      <Select 
        defaultValue={5} 
        width="200px" 
        marginRight="10px"
        onChange={(event) => setAutoRefreshInterval(event.target.value)}
        backgroundColor="aau.bg"
      >
        <option value={5000}>5 Seconds</option>
        <option value={10000}>10 Seconds</option>
        <option value={15000}>15 Seconds</option>
        <option value={20000}>20 Seconds</option>
        <option value={25000}>25 Seconds</option>
        <option value={30000}>30 Seconds</option>
      </Select>
      <Checkbox value={autoRefreshEnabled} onChange={onCheckChange}>Enabled</Checkbox>
      </Flex>
      <Text fontSize="12px">Auto refreshing resets "in chart" selections in the table</Text>
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
