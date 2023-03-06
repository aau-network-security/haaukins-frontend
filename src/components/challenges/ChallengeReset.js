import { Alert, AlertDescription, AlertIcon, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExercise } from "../../features/exercises/exerciseSlice";

function ChallengeReset({ parentExerciseTag }) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const status = useSelector((state) => state.exercise.status);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [resetError, setResetError] = useState("");

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
    } catch (err) {
      console.log("got error starting exercise", err)
      setResetError(err.apiError.status);
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
      {resetError !== "" &&
        <Alert 
        status='error' 
        position="absolute"
        width="475px"
        left="-300px"
        top="45px"
        height="40px"
        variant="top-accent"
        >
          <AlertIcon />
          <AlertDescription margin="5px">{resetError}</AlertDescription>
        </Alert>
      }
    </>
  );
}

export default ChallengeReset;
