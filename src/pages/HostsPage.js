import { Alert, AlertDescription, AlertDialog, AlertIcon, AlertTitle, Box, Center, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaNetworkWired } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHosts } from "../features/labs/labSlice";

export default function HostsPage() {
  const dispatch = useDispatch();
  const lab = useSelector((state) => state.lab);
  
  useEffect(() => {
    dispatch(fetchHosts());
  }, [dispatch]);

  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52" marginBottom="100px">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={FaNetworkWired} />
          <Text marginLeft="20px">Hosts</Text>
        </Center>
      </Box>
      <Alert
        status='info'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='fit-content'
        width="100%"
        marginBottom="20px"
        borderRadius="5px"
        overflowY="auto"
      >
        <Flex marginBottom="20px">
          <AlertIcon boxSize='20px' mr={0} />
          <AlertTitle marginLeft="10px">DNS Records</AlertTitle>
        </Flex>
        
        <AlertDescription lineHeight="2">
          Use the following hosts information below to enable DNS lookup when using VPN. <br/>

          The records below needs to be appended to the <b>/etc/hosts</b> file on your linux or mac machine. <br/> 
          For windows they can be appended to <b>C:\Windows\System32\drivers\etc\hosts</b>. <br/>

          Once added to the hosts file, you can contact the hosts based on their URL instead of IP. <br/><br/>


          <b>NOTE</b> Records are added dynamically to this page as challenges are started from the Challenges page.
        </AlertDescription>
      </Alert>
      <Box 
        h="500px" 
        background="#dfdfe3"
        color="#54616e"
        borderRadius="5px"
        overflowY="auto"
      >
        <Center marginTop="20px">
          <VStack>
            {Object.entries(lab.hosts).map(([key, host]) => (
              <Text key={key}>{host}</Text>
            ))}
          </VStack>
        </Center>
      </Box>
    </Flex>
  );
}
