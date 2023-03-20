import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../components/Logo";

function EventNotFoundPage() {
  const host = window.location.host;
  const eventTag = host.split(".")[0];

  return (
    <Flex flexDirection="column" width="100%" height="100%" marginTop="25vh">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Logo white="false" marginBottom={10}></Logo>
        <Text
            color="#211a52"
            fontWeight="bold"
            fontSize="30px"
        >
            Event not found</Text>
      </Stack>
    </Flex>
  );
}

export default EventNotFoundPage;
