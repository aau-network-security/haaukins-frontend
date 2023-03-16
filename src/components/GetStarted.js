import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

function GetStarted() {
    const loggedInTeam = useSelector((state) => state.team.loggedInTeam)
  return (
    <>
    {typeof loggedInTeam.lab === "undefined" ? 
    (
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
          <AlertTitle marginLeft="10px">Get started</AlertTitle>
        </Flex>
        
        <AlertDescription lineHeight="2">
          Press <b>Get a lab</b>, and choose between a VPN or in Browser connection.<br/>
          If the maximum amount of labs has been reached, you can solve the challenges that do not have a status bar.
        </AlertDescription>
      </Alert>
    ) : Object.keys(loggedInTeam.lab.labInfo.exercisesStatus).length === 0 && (
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
          <AlertTitle marginLeft="10px">Start your first challenge</AlertTitle>
        </Flex>
        
        <AlertDescription lineHeight="2">
          Some challenges do not have a status bar. These challenges can be solved without needing access to the lab.<br/>
          The challenges that have a status bar, will need to be started before they can be solved.<br/><br/>

          To start a challenge, click on the challenge you would like to solve, and press <b>Start</b>.<br/>
          When the challenge has started the status should switch from <b>Not running</b> to <b>Running</b>.<br/><br/>
          
          <b>NOTE:</b> Some challenges may be a part of a series of challenges, therefore<br/>
          other challenges than the one you have started,
          may also show the status <b>Running</b>
        </AlertDescription>
      </Alert>
    )}
    </>
  )
}

export default GetStarted