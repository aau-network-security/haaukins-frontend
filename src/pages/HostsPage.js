import { Box, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { FaNetworkWired } from "react-icons/fa"
import React from "react";

export default function HostsPage() {
  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={FaNetworkWired} />
          <Text marginLeft="20px">Hosts</Text>
        </Center>
      </Box>
    </Flex>
  );
}
