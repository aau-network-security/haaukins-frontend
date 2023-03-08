import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Fade, ScaleFade, Icon, Collapse } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { startExercise, stopExercise } from "../../features/exercises/exerciseSlice";

function ChallengeStartStop({ parentExerciseTag }) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const stateStatus = useSelector((state) => state.exercise.status);
  const dispatch = useDispatch()

  const [challengeStatus, setChallengeStatus] = useState("stopped");  
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [startStopError, setStartStopError] = useState("");
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (loggedInTeam.status === "runningExCommand" && stateStatus !== "starting/stopping") {
      setIsDisabled(true)
      setIsLoading(false)
    } else if (loggedInTeam.status === "runningExCommand" && stateStatus === "starting/stopping") {
      setIsLoading(true)
      setIsDisabled(false)
    } else if (stateStatus === "starting/stopping") {
      setIsLoading(true)
      setIsDisabled(false)
    } else {
      setIsLoading(false)
      setIsDisabled(false)
    }
  }, [stateStatus, loggedInTeam])

  useEffect(() => {
    if (typeof loggedInTeam.lab !== "undefined") {
      if (typeof loggedInTeam.lab.labInfo.exercisesStatus[
        parentExerciseTag
      ] === "undefined") {
        setChallengeStatus("stopped")
        return
      } else if (typeof loggedInTeam.lab.labInfo.exercisesStatus[parentExerciseTag] !== "undefined") {
        let status = "stopped";
        loggedInTeam.lab.labInfo.exercisesStatus[parentExerciseTag].machines.forEach(element => {
          if (element.status === "running") {
            status = "running";
          }
        });
        setChallengeStatus(status)
        return
      }
    }
    
  }, [loggedInTeam]);

  const exerciseStart = async () => {
    try {
      const response = await dispatch(startExercise({parentTag: parentExerciseTag})).unwrap()
      setStartStopError("");
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.log("got error starting exercise", err)
      setStartStopError(err.apiError.status);
      setSuccess(false)
      setTimeout(() => setStartStopError(""), 5000)
    }
  }

  const exerciseStop = async () => {
    try {
      const response = await dispatch(stopExercise({parentTag: parentExerciseTag})).unwrap()
      setStartStopError("");
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.log("got error starting exercise", err)
      setStartStopError(err.apiError.status);
      setSuccess(false)
      setTimeout(() => setStartStopError(""), 5000)
    }
  }

  return (
    <>
      {typeof loggedInTeam.lab !== "undefined" && (
        <>
          {challengeStatus === "stopped" ? (
            <Button
              backgroundColor="#54616e"
              _hover={{ backgroundColor: "#434d56" }}
              color="#dfdfe3"
              variant="solid"
              onClick={exerciseStart}
              isLoading={isLoading}
              isDisabled={isDisabled}
            >
              Start
            </Button>
          ) : (
            <Button
              backgroundColor="#54616e"
              _hover={{ backgroundColor: "#434d56" }}
              color="#dfdfe3"
              variant="solid"
              onClick={exerciseStop}
              isLoading={isLoading}
              isDisabled={isDisabled}
            >
              Stop
            </Button>
          )}
        </>
      )}

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
        <Collapse in={startStopError} unmountOnExit>
          <Alert 
          status='error' 
          height="60px"
          variant="top-accent"
          >
            <AlertIcon />
            <AlertDescription margin="5px">{startStopError}</AlertDescription>
          </Alert>
        </Collapse>
      </Box>      
    </>
  );
}

export default ChallengeStartStop;
