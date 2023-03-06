import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startExercise, stopExercise } from "../../features/exercises/exerciseSlice";

function ChallengeStartStop({ parentExerciseTag }) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const stateStatus = useSelector((state) => state.exercise.status);
  const dispatch = useDispatch()

  const [challengeStatus, setChallengeStatus] = useState("stopped");  
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (loggedInTeam.status === "runningExCommand" && stateStatus !== "starting/stopping") {
      setIsDisabled(true)
      setIsLoading(false)
    } else if (loggedInTeam.status === "runningExCommand" && stateStatus === "starting/stopping") {
      setIsLoading(true)
      setIsDisabled(false)
    } else if (stateStatus === "starting" || stateStatus === "stopping") {
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
              onClick={() => dispatch(startExercise({parentTag: parentExerciseTag, replaces: ""}))}
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
              onClick={() => dispatch(stopExercise({parentTag: parentExerciseTag}))}
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
