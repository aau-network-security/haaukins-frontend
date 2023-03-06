import {
  Box,
  Center,
  Flex,
  Icon,
  Text,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaFlagCheckered } from "react-icons/fa";
import { MdOutlinedFlag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const openModal = (challenge) => {
    dispatch(setSelectedExercise(challenge));
    setIsModalOpen(true);
  };

  return (
    <>
      <Flex
        className="challenges-page"
        w="100%"
        m={"auto"}
        flexDir="column"
        color="#211a52"
      >
        <Box w="100%" marginTop="50px" marginBottom="50px">
          <Center w="100%" fontSize="50px">
            <Icon as={MdOutlinedFlag} />
            <Text marginLeft="20px">Challenges</Text>
          </Center>
        </Box>

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
                    staticChallenge={exercise.static}
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
