import { Box, Center, Flex, HStack, Image, Text, VStack, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from '@chakra-ui/react'
import ifLogoBlack from '../assets/if_logo_black.png'
import blueLogo from '../assets/bluelogo.png'
import cyberSkillsLogoBlack from '../assets/cyberskills_logo_black.png'
import campfireSecurityLogo from '../assets/campfirelogo.png'
import daniaLogo from '../assets/da-90.png'
import dtuLogo from '../assets/dtu-90.png'
import aauLogo from '../assets/aau-uk.png'
import keaLogo from '../assets/kea-90.jpg'
import happyLogo from '../assets/happy-90.png'
import eaaLogo from '../assets/eaa-90.png'
import cbslogo from '../assets/cbs.png'
import { FaDiscord } from 'react-icons/fa'
export default function HomePage() {
    return (
      <>
      <Flex
        maxW={"960px"}
        m={"auto"}
        flexDir="column"
        color="#211a52"
      >
        <Box
          fontWeight="bold"
          fontSize="3rem"
        >
          <Center>
            Haaukins
          </Center>
        </Box>
        <Box
          fontWeight="500"
          fontSize="1.5rem"
          lineHeight="1.5"
        >
          <Center>A Platform for Cyber Security Exercises</Center>
        </Box>


        <Box
          marginTop="60px"
        >
          <Center>
            <Text>Founded by{' '}
              <Link href="https://danishcybersecurityclusters.dk/" target="_blank" color="#54616e">Danish Cyber Security Clusters</Link>
              {' '}and supported by
            </Text>
          </Center>
        </Box>
        <Box
          marginTop="20px"
        >
          <Center>
            <Link href="https://www.industriensfond.dk/" target="_blank">
              <Image w="600px" src={ifLogoBlack}/>
            </Link>
          </Center>
        </Box>


        <Box
          marginTop="60px"
        >
          <Center>
            <Text>
              Developed at{' '}
              <Link href="https://es.aau.dk/" target="_blank" color="#54616e">Aalborg University</Link>
              {' '}(Department of electronic systems)
            </Text>
          </Center>
        </Box>
        <Box
          marginTop="20px"
        > 
          <Center>
            <Flex>
              <Image w="200px" marginRight="20px" src={blueLogo}/>
              <VStack>
              <Text>
                <Link href="https://github.com/Mikkelhost" target="_blank" color="#54616e">Mikkel Høst Christiansen</Link>
                {' '}(Research Assistant)
              </Text>
              <Text>
                <Link href="https://mrturkmen.com/" target="_blank" color="#54616e">Ahmet Turkmen</Link>
                {' '}(Research Assistant)
              </Text>
              <Text>
                <Link href="https://github.com/gianmarcomennecozzi" target="_blank" color="#54616e">Gian Marco Mennecozzi</Link>
                {' '}(Research Assistant)
              </Text>
              <Text>
                <Link href="https://github.com/kdhageman" target="_blank" color="#54616e">Kasper Hageman</Link>
                {' '}(Ph.D. student)
              </Text>
              <Text>
                <Link href="https://github.com/tpanum" target="_blank" color="#54616e">Thomas Kobber Panum</Link>
                {' '}(Ph.D. Student)
              </Text>
              <Text>
                <Link href="https://github.com/eyJhb" target="_blank" color="#54616e">Johan Hempel Bengtson</Link>
                {' '}(Student Helper)
              </Text>
              </VStack>
            </Flex>
          </Center>
        </Box>
        {/* campfire logo */}
        <Box
          marginTop="60px"
        >
          <Center>

            <Text>
              Maintained by {' '}
              <Link href="https://campfiresecurity.dk/" target="_blank" color="#54616e">Campfire Security</Link>.  
              </Text>
          </Center>
        </Box>
        <Box
        >
          <Center>
            <Link
              href="https://campfiresecurity.dk/" 
              target="_blank"
            >
              <Image w="600px" src={campfireSecurityLogo}/>
            </Link>
            
          </Center>          
        </Box>
        <Box
          marginTop="0px"
        >
          <Center>

            <Text>
               Experiencing problems with the platform? Reach out to our support at haaukins@campfiresecurity.dk 
            </Text>
          </Center>
        </Box>

        {/* cyberskills logo */}
        <Box
          marginTop="60px"
        >
          <Center>
            <Text>Interested in improving your Cyber security skillset? Check out the Cyberskills community!</Text>
          </Center>
        </Box>
        <Box
         marginTop="20px"
        >
          <Center>
            <Link
              href="https://www.cyberskills.dk/" 
              target="_blank"
            >
              <Image w="400px" src={cyberSkillsLogoBlack}/>
            </Link>
            
          </Center>          
        </Box>
        <Box
         marginTop="20px"
        >
          <Center>
            <Text>You are more than welcome to join the CyberSkills Discord Server, and join the community</Text>
          </Center>          
        </Box>
        <Box>
          <Center>
            <Link href="https://discord.gg/cyberskills" target="_blank" color="#5864ed">
              <Icon as={FaDiscord} fontSize="50px"></Icon>
            </Link>
          </Center>
        </Box>


        <Box
          marginTop="60px"
          marginBottom="150px"
        >
          <Center>
            <HStack spacing="15px">
            <Link
              href="https://aau.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={aauLogo}/> 
            </Link>
            <Link
              href="https://happy42.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={happyLogo}/> 
            </Link>
            <Link
              href="https://eadania.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={daniaLogo}/> 
            </Link>
            <Link
              href="https://www.dtu.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={dtuLogo}/> 
            </Link>
            <Link
              href="https://kea.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={keaLogo}/> 
            </Link>
            <Link
              href="https://www.eaaa.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={eaaLogo}/>
            </Link>
            <Link
              href="https://www.cbs.dk/" 
              target="_blank"
            >
              <Image className="partner-image" src={cbslogo}/> 
            </Link>
            </HStack>
          </Center>
        </Box>
      </Flex>
      </>
    );
};