import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFlag } from "react-icons/md";
import ChallengeSolvesTable from "./ChallengeSolvesTable";
import {
  fetchExercises,
  solveExercise,
} from "../../features/exercises/exerciseSlice";
import ChallengeReset from "./ChallengeReset";
import ChallengeStartStop from "./ChallengeStartStop";

export default function ChallengeModal({ isOpen, onClose }) {
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const selectedExercise = useSelector(
    (state) => state.exercise.selectedExercise
  );
  const [flagState, setFlagState] = useState("");
  const dispatch = useDispatch();
  
  const toast = useToast();
  const toastIdRef = React.useRef();

  const submitForm = async (e) => {
    e.preventDefault();
    let reqData = {
      parentTag: selectedExercise.parentExerciseTag,
      tag: selectedExercise.tag,
      flag: flagState,
    };
    try {
      const response = await dispatch(solveExercise(reqData)).unwrap();
      dispatch(fetchExercises());
      toastIdRef.current = toast({
        title: "Challenge successfully solved",
        description: "The flag you entered was correct",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (err) {
      toastIdRef.current = toast({
        title: "Challenge solve failed",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setFlagState("");
  };

  const changeHandler = (e) => {
    setFlagState(e.target.value.trim());
  };

  const closeModal = () => {
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
            {!selectedExercise.static && 
              <HStack position="absolute" top="17px" right="50px" spacing="20px">
                <ChallengeReset parentExerciseTag={selectedExercise.parentExerciseTag}/>
                {eventInfo.type === "advanced" && (
                  <ChallengeStartStop parentExerciseTag={selectedExercise.parentExerciseTag}/>
                )}
            
              </HStack>
            }
            
          
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
                        <Box w="100%" marginTop="20px">
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
                      <Flex backgroundColor="#fff" color="#000"
                       className="markdown-body">
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
                                children={<MdFlag fontSize="25px" color="#7e8b9f" />}
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
