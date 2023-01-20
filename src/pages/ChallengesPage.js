import { Box, Center, Flex, Icon, Text, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaFlagCheckered } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import Challenge from '../components/challenges/Challenge'
import ChallengeModal from '../components/challenges/ChallengeModal'
import { setSelectedChallenge } from '../features/challenges/challengeSlice'
export default function ChallengesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onModalClose = () => setIsModalOpen(false)
  const cancelRef = React.useRef()

  const dispatch = useDispatch()

  const openModal = (challenge) => {
    dispatch(setSelectedChallenge(challenge))
    setIsModalOpen(true)
  }
  
  const challenges = [
    {name: "Hey im a fucking moron thank you", solved: true, points: 1000, solves: [], description: "<p><em>Cateogry: Blockchain</em></p>\n<p>You are out for a walk in april 2020, you find this sweet haiku on the cold ground.</p>\n<pre><code>syvende april\n\nda jeg mistede mit flag\n\nropsten åh ropsten\n</code></pre>\n<p>(<strong>NOTE</strong> This challenge was made for DDC in 2020 so the flag will be in the format <code>DDC{flag_here}</code>)</p>\n"},
    {name: "Test2", solved: false, points: 1000, solves: [{time: "time", name: "testteam"},{time: "time", name: "testteam"}], description: "<p>A journalist investigation Formal Bank is in big trouble!\nFollow his trail and see where he is being held in order to save him.\n\nHe was last seen writing at: <code>jobspace.hkn</code></p>\n<p>Flag format: HKN{Streetname-number}</p>\n<p>p.s. The correct street is 2 words, connect them with a <code>-</code> ;)</p>\n"},
    {name: "test3", solved: false, points: 1000, solves: [{time: "time", name: "testteam"}], description: "<p>Politimester Striks er på sporet af Bjørnebanden, som han er sikker på planlægger noget. Det er lykkedes politiet at opsnappe SMS&#39;er mellem to &#34;burner phones&#34;, som de mener tilhører 176-671 og 176-617:</p>\n<img src=\"https://i.imgur.com/53g4S3e.jpg\" alt=\"Bjørnebanden SMS&#39;er\">\n<p>Desværre forstår Striks ikke, hvordan banden kommunikerer, så han kan ikke tyde deres beskeder. Han har spurgt kriminalinspektør Rebus om hjælp, men hun kunne heller ikke knække koden.</p>\n<p>Kan du hjælpe Striks med at finde ud af hvad Bjørnebanden pønser på?</p>\n<p>SMSerne kan hentes her: <a href=\"https://nextcloud.ntp-event.dk:8443/s/pS6kCeeYYpMpe8W/download/SMSer.txt\" rel=\"nofollow\">SMSer.txt</a></p>\n<p><em>Tip: SMSerne er på dansk og er krypteret med et &#34;substitution cipher&#34;, hvor hver emoji svarer til et bogstav eller tegn.</em></p>\n"},
    {name: "test4", solved: true, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test5", solved: true, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test6", solved: false, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test7", solved: true, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test8", solved: false, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test9", solved: true, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test10", solved: false, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test11", solved: false, points: 1000, solves: [{time: "time", name: "testteam"}]},
    {name: "test12", solved: true, points: 1000, solves: [{time: "time", name: "testteam"}]},
  ]
  const categories = [
    {name: 'Starters', challenges: challenges},
    {name: 'Reversing', challenges: challenges},
    {name: 'Misc', challenges: challenges},
    {name: 'Binary Exploitation', challenges: challenges},
    {name: 'Web Exploitation', challenges: challenges},
  ]
  return (
    <>
      <Flex
        maxW={"1140px"}
        w="100%"
        m={"auto"}
        flexDir="column"
        color="#211a52"
      >
        <Box w="100%" marginTop="50px" marginBottom="50px">
          <Center w="100%" fontSize="50px">
              <Icon as={FaFlagCheckered} />
              <Text marginLeft="20px">Challenges</Text>
          </Center>          
        </Box>

        <Box marginBottom="100px">
        {Object.entries(categories).map(([key, category]) => (
        <Box key={key} w="100%" padding="0px 20px">
          <Text fontSize="34px">{category.name}</Text>
          <SimpleGrid 
            margin="15px 0 35px 0"
            minChildWidth="250px" 
            columns={[1, 2, 3, 4]} 
            spacing='20px'
            zIndex="100"
          >
            {Object.entries(category.challenges).map(([key, challenge]) => (
              <Challenge 
                key={key} 
                solved={challenge.solved}
                name={challenge.name}
                points={challenge.points}
                onClick={() => openModal(challenge)}
              />          
            ))}
          </SimpleGrid>
        </Box>
        ))}
        </Box>
        <ChallengeModal isOpen={isModalOpen} onClose={onModalClose}/>
        
      </Flex>
    </>
  )
}

