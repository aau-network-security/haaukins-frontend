import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Fade, ScaleFade, Icon, Collapse, useToast } from "@chakra-ui/react";
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
        if (loggedInTeam.lab.labInfo.exercisesStatus[parentExerciseTag].machines !== null) {
          loggedInTeam.lab.labInfo.exercisesStatus[parentExerciseTag].machines.forEach(element => {
            if (element.status === "running") {
              status = "running";
            }
          });
        }
        setChallengeStatus(status)
        return
      }
    }
    
  }, [loggedInTeam]);

  const toast = useToast();
  const toastIdRef = React.useRef();

  const exerciseStart = async () => {
    try {
      const response = await dispatch(startExercise({parentTag: parentExerciseTag})).unwrap()
      toastIdRef.current = toast({
        title: "Challenge started",
        description: "The challenge was successfully started",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Challenge start failed",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const exerciseStop = async () => {
    try {
      const response = await dispatch(stopExercise({parentTag: parentExerciseTag})).unwrap()
      toastIdRef.current = toast({
        title: "Challenge stopped",
        description: "The challenge was successfully stopped",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Challenge stop failed",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      {typeof loggedInTeam.lab !== "undefined" && (
        <>
          {challengeStatus === "stopped" ? (
            <Button
              backgroundColor="#5caf8d"
              _hover={{ backgroundColor: "#4c9a79" }}
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
              backgroundColor="#bf3d3d"
              _hover={{ backgroundColor: "#9b3131" }}
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
    </>
  );
}

export default ChallengeStartStop;
