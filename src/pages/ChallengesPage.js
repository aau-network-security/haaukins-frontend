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
  console.log(categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const openModal = (challenge) => {
    dispatch(setSelectedExercise(challenge));
    setIsModalOpen(true);
  };

  // const challenges = [
  //   {name: "Long challenge name lorem ipsum", solved: true, points: 1000, solves: [], description: "<p><em>Cateogry: Blockchain</em></p>\n<p>You are out for a walk in april 2020, you find this sweet haiku on the cold ground.</p>\n<pre><code>syvende april\n\nda jeg mistede mit flag\n\nropsten åh ropsten\n</code></pre>\n<p>(<strong>NOTE</strong> This challenge was made for DDC in 2020 so the flag will be in the format <code>DDC{flag_here}</code>)</p>\n"},
  //   {name: "Test2", solved: false, points: 1000, solves: [{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"},{date: "date", team: "testteam"}], description: "<p>A journalist investigation Formal Bank is in big trouble!\nFollow his trail and see where he is being held in order to save him.\n\nHe was last seen writing at: <code>jobspace.hkn</code></p>\n<p>Flag format: HKN{Streetname-number}</p>\n<p>p.s. The correct street is 2 words, connect them with a <code>-</code> ;)</p>\n"},
  //   {name: "test3", solved: false, points: 1000, solves: [{date: "date", team: "testteam"}], description: ""},
  //   {name: "test4", solved: true, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test5", solved: true, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test6", solved: false, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test7", solved: true, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test8", solved: false, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test9", solved: true, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test10", solved: false, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test11", solved: false, points: 1000, solves: [{date: "date", team: "testteam"}]},
  //   {name: "test12", solved: true, points: 1000, solves: [{date: "date", team: "testteam"}]},
  // ]
  // const categories = [
  //   {name: 'Starters', challenges: challenges},
  //   {name: 'Reversing', challenges: challenges},
  //   {name: 'Misc', challenges: challenges},
  //   {name: 'Binary Exploitation', challenges: challenges},
  //   {name: 'Web Exploitation', challenges: challenges},
  // ]
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
            <Icon as={FaFlagCheckered} />
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
