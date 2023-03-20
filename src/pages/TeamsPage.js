import { Box, Center, Flex, Text, Icon } from "@chakra-ui/react";
import { RiTeamLine } from "react-icons/ri"
import React from "react";

export default function TeamsPage() {
  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={RiTeamLine} />
          <Text marginLeft="20px">Teams</Text>
        </Center>
      </Box>
    </Flex>
  );
}
