import {
  Box,
  Center,
  Flex,
  Icon,
  Text,
  SimpleGrid,
  Wrap,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { MdOutlinedFlag, MdOutlineMoreTime } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api/client";
import Challenge from "../components/challenges/Challenge";
import ChallengeModal from "../components/challenges/ChallengeModal";
import {
  fetchExercises,
  setSelectedExercise,
} from "../features/exercises/exerciseSlice";
import { setScrolledToTop } from "../features/generic/genericSlice";
export default function ChallengesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = () => setIsModalOpen(false);
  const categories = useSelector((state) => state.exercise.categories);
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const openModal = (challenge) => {
    dispatch(setSelectedExercise(challenge));
    setIsModalOpen(true);
  };

  var nowPlusOneHour = () => {
    var date = new Date.now()
    date.setHours(date.getHours() + 2);
    return date
  }

  const [extendLabTimeStatus, setExtendLabTimeStatus] = useState("idle")
  const extendLabTimeRemaining = () => {
    console.log("extending")
    let token = localStorage.getItem("token");
    // Thunk will return error if it cannot pass the value as json
    let endpoint = "labs/extend";
    setExtendLabTimeStatus("extending")
    fetch(BASE_URL + endpoint, {
      headers: {
        Authorization: token,
      },
      method: "PATCH"
    })
    .then((response) => response.json())
    .then((data) => {
      setExtendLabTimeStatus("idle")
    })
    .catch((error) => { 
      setExtendLabTimeStatus("idle")
    });
  }

  return (
    <>
      <Flex
        className="challenges-page"
        w="100%"
        m={"auto"}
        flexDir="column"
        color="#211a52"
      >
        <Box w="100%" marginTop="50px" marginBottom="30px">
          <Center w="100%" fontSize="50px">
            <Icon as={MdOutlinedFlag} />
            <Text marginLeft="20px">Challenges</Text>
          </Center>
        </Box>
        {typeof loggedInTeam.lab !== "undefined" && 
        <Box marginBottom="20px">
        <Center>
        <Text fontSize="25px">Lab time remaining: </Text>
        <Text marginLeft="10px" fontSize="25px">
          <Countdown date={Date.parse(loggedInTeam.lab.labInfo.expiresAtTime)}/>
          {Date.parse(loggedInTeam.lab.labInfo.expiresAtTime) < (new Date()).setHours((new Date()).getHours() + 1) && 
          <IconButton 
            icon={<MdOutlineMoreTime size="20px"/>} 
            top="-2px"
            position="relative"
            size="sm"
            marginLeft="10px"
            backgroundColor="#54616e"
            _hover={{ backgroundColor: "#434d56" }}
            color="#dfdfe3"
            variant="solid"
            onClick={extendLabTimeRemaining}
            isLoading={extendLabTimeStatus !== "idle" ? true: false}
          />
          }
          
        </Text>
        </Center>
        
      </Box>
        }
        

        <Box marginBottom="100px">
          {Object.entries(categories).map(([key, category]) => (
            <Box key={key} w="100%" padding="0px 20px">
              <Text fontSize="34px">{category.name}</Text>
              <Wrap margin="15px 0 35px 0" spacing="20px" zIndex="100">
                {Object.entries(category.exercises).map(([key, exercise]) => (
                  <Challenge
                    key={key}
                    solved={exercise.solved}
                    parentExerciseTag={exercise.parentExerciseTag}
                    isStatic={exercise.static}
                    name={exercise.name}
                    points={exercise.points}
                    onClick={() => openModal(exercise)}
                  />
                ))}
              </Wrap>
            </Box>
          ))}
        </Box>
        <ChallengeModal isOpen={isModalOpen} onClose={onModalClose} />
      </Flex>
    </>
  );
}
