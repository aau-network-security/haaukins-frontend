import { Box, Button, Center, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { FaFlag } from 'react-icons/fa'

export default function ChallengeModal({ isOpen, onClose }) {
    const selectedChallenge = useSelector((state) => state.challenge.selectedChallenge)

    const submitForm = (e) => {
        e.preventDefault()
        console.log("submitting flag")
    }
    const closeModal = () => {
        onClose()
    }
    return (
        <>
        <Modal 
            onClose={closeModal} 
            isOpen={isOpen} 
            scrollBehavior='inside' 
            size="lg" 
            isCentered
            motionPreset='slideInBottom'

        >
        <ModalOverlay />
        <ModalContent maxH="100%">
            <ModalCloseButton />
            <ModalBody margin="0" padding="0">
                <Tabs variant='enclosed'>
                <TabList margin="20px">
                    <Tab color="#211a52">Challenge</Tab>
                    <Tab color="#211a52">{selectedChallenge.solves.length} Solves</Tab>
                </TabList>

                <TabPanels >
                        <TabPanel maxH="600px" overflowX="auto" marginRight="3px" padding="0px 40px 0px 45px">
                            <Flex w="100%" flexDir="column" fontFamily="Audiowide" fontSize="20px">
                                <Box w="100%" marginTop="15px">
                                    <Center>
                                        <Text textAlign="center">{selectedChallenge.name}</Text>
                                    </Center>
                                </Box>
                                <Box w="100%" marginTop="10px" marginBottom="45px">
                                    <Center>
                                        <Text>{selectedChallenge.points}</Text>
                                    </Center>
                                </Box>
                            </Flex>
                            <Flex className='markdown-body'>
                                <div dangerouslySetInnerHTML={{ __html: selectedChallenge.description}} />                                        
                            </Flex>
                            
                        </TabPanel>
                        <TabPanel maxH="600px" overflowX="auto" marginRight="3px" padding="0px 40px 0px 45px">
                        <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>                      
            </ModalBody>
            <form onSubmit={submitForm}>
                <ModalFooter>
                    <Flex w="100%">
                        <Stack w="100%">
                            <FormControl marginBottom="20px">
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<FaFlag color='#7e8b9f'/>}
                                    />
                                    <Input size="lg" borderBottomWidth="2px" variant='flushed' type="text" name="name" placeholder="HKN{some-flag-here}" />
                                </InputGroup>
                            </FormControl>
                            <Button 
                                w="100%"
                                type='submit' 
                                backgroundColor="#54616e"
                                _hover={{backgroundColor: '#434d56'}}
                                color="white"
                                variant='solid'
                                disabled={!selectedChallenge.solved ? false : true}
                            >
                                {!selectedChallenge.solved ? 
                                <>
                                    Submit
                                </>
                                : 
                                <>
                                    Already Solved
                                </>
                                }
                            </Button>
                        </Stack>
                    </Flex>
                    
                </ModalFooter>
            </form>  
                      
        </ModalContent>
        </Modal>
    </>
    )
}
