import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function ChallengeStatusBanner({ parentExerciseTag }) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  let challengeRunning = true;
  if (loggedInTeam.lab.labInfo.exercisesStatus[parentExerciseTag].machines !== null) {
    loggedInTeam.lab.labInfo.exercisesStatus[parentExerciseTag].machines.forEach(
      (machine) => {
        if (machine.status !== "running") {
          challengeRunning = false;
        }
      }
    );
  } else {
    challengeRunning = false;
  }
  

  if (challengeRunning) {
    return (
      <></>
    );
  } else {
    return (
      <Box
        w="100%"
        bg="#bf3d3d"
        position="absolute"
        top="0"
        borderTopRadius="0.375rem"
        fontSize="13px"
      >
        Not running
      </Box>
    );
  }
}

export default function Challenge({
  name,
  parentExerciseTag,
  points,
  solved,
  isStatic,
  onClick,
}) {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);

  return (
    <Button
      height="110px"
      width="100%"
      className="challenge-container"
      bg={solved === false ? "#211a52" : "#5caf8d"}
      _hover={solved === false ? { bg: "#18123a" } : { bg: "#4c9a79" }}
      onClick={onClick}
    >
      <VStack
        color="#dfdfe3"
        fontWeight="400"
        fontFamily="'Audiowide', cursive"
      >
        {!isStatic && (
          <>
            {!solved && (
              <>
                {typeof loggedInTeam.lab !== "undefined" ? (
                  <>
                    <>
                      {typeof loggedInTeam.lab.labInfo.exercisesStatus[
                        parentExerciseTag
                      ] === "undefined" ? (
                        <>
                          <Box
                            w="100%"
                            bg="#bf3d3d"
                            position="absolute"
                            top="0"
                            borderTopRadius="0.375rem"
                            fontSize="13px"
                          >
                            Not running
                          </Box>
                        </>
                      ) : (
                        <ChallengeStatusBanner
                          parentExerciseTag={parentExerciseTag}
                        />
                      )}
                    </>
                  </>
                ) : (
                  <Box
                    w="100%"
                    bg="#bf3d3d"
                    position="absolute"
                    top="0"
                    borderTopRadius="0.375rem"
                    fontSize="13px"
                  >
                    Requires lab
                  </Box>
                )}
              </>
            )}
          </>
        )}
        <Center
          w="100%"
          color="#dfdfe3"
          fontWeight="400"
          fontFamily="'Audiowide', cursive"
        >
          <VStack spacing="15px">
            <Text
              w="100%"
              whiteSpace="pre-line"
              wordBreak="break-word"
              fontSize="14px"
            >
              {name}
            </Text>
            <Text fontSize="16px">{points}</Text>
          </VStack>
        </Center>
      </VStack>
    </Button>
  );
}
