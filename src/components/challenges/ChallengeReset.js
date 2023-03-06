import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetExercise } from "../../features/exercises/exerciseSlice";

function ChallengeReset({ parentExerciseTag, onClose }) {
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

  return (
    <>
      {typeof loggedInTeam.lab !== "undefined" && (
        <Button
          backgroundColor="#54616e"
          _hover={{ backgroundColor: "#434d56" }}
          color="#dfdfe3"
          variant="solid"
          onClick={() => dispatch(resetExercise({parentTag: parentExerciseTag}))}
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
