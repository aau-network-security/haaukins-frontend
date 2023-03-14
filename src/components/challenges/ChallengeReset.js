import { Alert, AlertDescription, AlertIcon, Box, Button, Center, Collapse, Fade, Icon, ScaleFade } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExercise } from "../../features/exercises/exerciseSlice";
import { MdCheckCircle } from "react-icons/md";

function ChallengeReset({ parentExerciseTag }) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const status = useSelector((state) => state.exercise.status);
  const eventInfo = useSelector((state) => state.event.eventinfo);

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [resetError, setResetError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (loggedInTeam.status === "runningExCommand" && status !== "resetting") {
      setIsDisabled(true)
      setIsLoading(false)
    } else if (loggedInTeam.status === "runningExCommand" && status === "resetting") {
      setIsLoading(true)
      setIsDisabled(false)
    } else if (status === "resetting") {
      setIsLoading(true)
      setIsDisabled(false)
    } else {
      setIsLoading(false)
      setIsDisabled(false)
    }
  }, [status, loggedInTeam])

  const exerciseReset = async () => {
    try {
      const response = await dispatch(resetExercise({parentTag: parentExerciseTag})).unwrap()
      setResetError("");
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.log("got error starting exercise", err)
      setResetError(err.apiError.status);
      setSuccess(false);
      setTimeout(() => setResetError(""), 3000)
    }
  }

  return (
    <>
      {typeof loggedInTeam.lab !== "undefined" && (
        <Button
          backgroundColor="#54616e"
          _hover={{ backgroundColor: "#434d56" }}
          color="#dfdfe3"
          variant="solid"
          onClick={exerciseReset}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          Reset
        </Button>
      )}
      {eventInfo.type === "advanced" ? (
        <Box
        position="absolute"
        width="470px"
        left="-297px"
        top="45px"
      >
        <ScaleFade in={success} unmountOnExit>
          <Center marginTop="15px">
            <Icon color="#5caf8d" fontSize="30px" as={MdCheckCircle}></Icon>
          </Center>
          
        </ScaleFade>
        <Collapse in={resetError} unmountOnExit>
          <Alert 
            status='error'
            height="60px"
            variant="top-accent"
          >
            <AlertIcon />
            <AlertDescription margin="5px">{resetError}</AlertDescription>
          </Alert>
        </Collapse>
      </Box>
      ) : (
        <Box
        position="absolute"
        width="470px"
        left="-386px"
        top="45px"
      >
        <ScaleFade in={success} unmountOnExit>
          <Center marginTop="15px">
            <Icon color="#5caf8d" fontSize="30px" as={MdCheckCircle}></Icon>
          </Center>
          
        </ScaleFade>
        <Collapse in={resetError} unmountOnExit>
          <Alert 
            status='error'
            height="60px"
            variant="top-accent"
          >
            <AlertIcon />
            <AlertDescription margin="5px">{resetError}</AlertDescription>
          </Alert>
        </Collapse>
      </Box>
      )}
      
    </>
  );
}

export default ChallengeReset;
