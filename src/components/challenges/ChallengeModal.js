import {
    Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFlag } from "react-icons/fa";
import ChallengeSolvesTable from "./ChallengeSolvesTable";
import {
  fetchExercises,
  solveExercise,
} from "../../features/exercises/exerciseSlice";

export default function ChallengeModal({ isOpen, onClose }) {
  const selectedExercise = useSelector(
    (state) => state.exercise.selectedExercise
  );
  const [flagState, setFlagState] = useState("");
  const [submitError, setSubmitError] = useState("");
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    let reqData = {
      parentTag: selectedExercise.parentExerciseTag,
      tag: selectedExercise.tag,
      flag: flagState,
    };
    try {
      const response = await dispatch(solveExercise(reqData)).unwrap();
      setSubmitError("");
      dispatch(fetchExercises());
      closeModal();
    } catch (err) {
      setSubmitError(err.apiError.status);
    }
    setFlagState("");
  };

  const changeHandler = (e) => {
    setFlagState(e.target.value.trim());
  };

  const closeModal = () => {
    setSubmitError("");
    setFlagState("");
    onClose();
  };
  return (
    <>
      <Modal
        onClose={closeModal}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="lg"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent maxH="100%" minH="400px">
          <ModalCloseButton />
          <ModalBody margin="0" padding="0">
            <Tabs variant="enclosed">
              <TabList margin="20px">
                <Tab color="#211a52">Challenge</Tab>
                <Tab color="#211a52">
                  {selectedExercise.solves.length} Solves
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex
                    maxH="600px"
                    overflowY="auto"
                    marginRight="3px"
                    padding="0px 40px 0px 45px"
                  >
                    <Stack w="100%">
                      <Flex
                        w="100%"
                        flexDir="column"
                        fontFamily="Audiowide"
                        fontSize="20px"
                      >
                        <Box w="100%" marginTop="15px">
                          <Center>
                            <Text textAlign="center">
                              {selectedExercise.name}
                            </Text>
                          </Center>
                        </Box>
                        <Box w="100%" marginTop="10px" marginBottom="45px">
                          <Center>
                            <Text>{selectedExercise.points}</Text>
                          </Center>
                        </Box>
                      </Flex>
                      <Flex className="markdown-body">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedExercise.description,
                          }}
                        />
                      </Flex>
                    </Stack>
                  </Flex>
                  <form onSubmit={submitForm}>
                    <ModalFooter>
                      <Flex w="100%">
                        <Stack w="100%">
                          <FormControl marginBottom="20px">
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<FaFlag color="#7e8b9f" />}
                              />
                              <Input
                                isDisabled={
                                  !selectedExercise.solved ? false : true
                                }
                                size="lg"
                                borderBottomWidth="2px"
                                variant="flushed"
                                type="text"
                                name="name"
                                onChange={changeHandler}
                                placeholder="HKN{some-flag-here}"
                              />
                            </InputGroup>
                          </FormControl>
                          {submitError && (
                            <Alert status="error">
                              <AlertIcon />
                              <AlertDescription>
                                {submitError}
                              </AlertDescription>
                            </Alert>
                          )}
                          <Button
                            w="100%"
                            type="submit"
                            backgroundColor="#54616e"
                            _hover={{ backgroundColor: "#434d56" }}
                            color="#dfdfe3"
                            variant="solid"
                            isDisabled={!selectedExercise.solved ? false : true}
                          >
                            {!selectedExercise.solved ? (
                              <>Submit</>
                            ) : (
                              <>Already Solved</>
                            )}
                          </Button>
                        </Stack>
                      </Flex>
                    </ModalFooter>
                  </form>
                </TabPanel>
                <TabPanel>
                  <Flex maxH="600px">
                    <ChallengeSolvesTable />
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
