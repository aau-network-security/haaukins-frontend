import { Button } from '@chakra-ui/react'
import React from 'react'

function ChallengeReset() {
  return (
    <Button 
        backgroundColor="#54616e"
        _hover={{ backgroundColor: "#434d56" }}
        color="#dfdfe3"
        variant="solid"
    >
        Reset
    </Button>
  )
}

export default ChallengeReset