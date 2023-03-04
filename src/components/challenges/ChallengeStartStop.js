import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';

function ChallengeStartStop({parentExerciseTag}) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  return (
    <>
    {typeof loggedInTeam.lab.labInfo.exercisesStatus[
      parentExerciseTag
    ] === "undefined" ? (
        <Button 
          backgroundColor="#54616e"
          _hover={{ backgroundColor: "#434d56" }}
          color="#dfdfe3"
          variant="solid"
        >
            Start
        </Button>
    ) : (
      <Button 
          backgroundColor="#54616e"
          _hover={{ backgroundColor: "#434d56" }}
          color="#dfdfe3"
          variant="solid"
        >
            Stop
        </Button>
    )}
    </>
  )
}

export default ChallengeStartStop