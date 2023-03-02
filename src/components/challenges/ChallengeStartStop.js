import { Button } from '@chakra-ui/react'
import React from 'react'

function ChallengeStartStop() {
  return (
    <Button 
        backgroundColor="#54616e"
        _hover={{ backgroundColor: "#434d56" }}
        color="#dfdfe3"
        variant="solid"
    >
        Start
    </Button>
  )
}

export default ChallengeStartStop