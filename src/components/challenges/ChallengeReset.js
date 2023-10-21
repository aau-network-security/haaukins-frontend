import { Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExercise } from "../../features/exercises/exerciseSlice";

function ChallengeReset({ parentExerciseTag }) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const status = useSelector((state) => state.exercise.status);

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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

  const toast = useToast();
  const toastIdRef = React.useRef();
  const exerciseReset = async () => {
    try {
      const response = await dispatch(resetExercise({parentTag: parentExerciseTag})).unwrap()
      toastIdRef.current = toast({
        title: "Challenge reset",
        description: "The challenge was successfully reset",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Challenge reset failed",
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
        <Button
          backgroundColor="#211a52"
          _hover={{ backgroundColor: "#18123a" }}
          color="#dfdfe3"
          variant="solid"
          onClick={exerciseReset}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          Reset
        </Button>
      )}      
    </>
  );
}

export default ChallengeReset;
