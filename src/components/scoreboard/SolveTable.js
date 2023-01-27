import React from "react";
import {
  Table,
  Thead,
  Tbody, Tr,
  Th,
  Td, TableContainer,
  Center,
  Icon,
  Switch,
  HStack
} from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa";
import { GiDrop, GiTrophy, GiMedal } from "react-icons/gi";

function ScoreTable() {
  const challengesList = [
    { name: "Challenge1", tag: "challenge-1" },
    { name: "Challenge2", tag: "challenge-1" },
    { name: "Challenge3", tag: "challenge-1" },
    { name: "Challenge4", tag: "challenge-1" },
    { name: "Challenge5", tag: "challenge-1" },
    { name: "Challenge60123123", tag: "challenge-1" },
    { name: "Challenge60123123", tag: "challenge-1" },
    { name: "Challenge60123123", tag: "challenge-1" },
    { name: "Challenge60123123", tag: "challenge-1" },
  ];
  const teams = [
    {
      teamName: "team1",
      inChart: true,
      score: 1000,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: true, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: true, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
      ],
    },
    {
      teamName: "team2",
      inChart: true,
      score: 999,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 2 },
        { name: "Challenge2", tag: "challenge-2", solved: true, rank: 1 },
        { name: "Challenge3", tag: "challenge-3", solved: true, rank: 2 },
        { name: "Challenge4", tag: "challenge-4", solved: false, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: true, rank: 3 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
      ],
    },
    {
      teamName: "team3",
      inChart: true,
      score: 998,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: true, rank: 10 },
        { name: "Challenge2", tag: "challenge-2", solved: true, rank: 10 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 1 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
      ],
    },
    {
      teamName: "team4",
      inChart: true,
      score: 997,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
      ],
    },
  ];

  const columnWidth = 63;
  const maxWidth = 500;
  const calculateMinWidth = () => {
    let width = challengesList.length * columnWidth;
    if (width < maxWidth) {
      return String(width) + "px";
    } else {
      return String(maxWidth) + "px";
    }
  };
  const calculateOverflow = () => {
    let width = challengesList.length * columnWidth;
    if (width < maxWidth) {
      return "visible";
    } else {
      return "overlay";
    }
  };
  return (
    <HStack spacing="0" w="100%" className="solve-table-container">
      <TableContainer overflowX="overlay" width="100%" minW="500px">
        <Table
          variant="unstyled"
          className="rotated-header solve-table table-left"
        >
          <Thead>
            <Tr>
              <Th textAlign="center">#</Th>
              <Th>In Chart</Th>
              <Th>Team</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(teams).map(([key, team]) => (
              <Tr key={key}>
                {key > 2 ? (
                  <Td textAlign="center" width="20px">
                    {Number(key) + 1}
                  </Td>
                ) : (
                  <>
                    {key == 0 && (
                      <Td width="20px">
                        <Icon
                          fontSize="xl"
                          color="#FFD700"
                          as={GiTrophy}
                        ></Icon>
                      </Td>
                    )}
                    {key == 1 && (
                      <Td width="20px">
                        <Icon fontSize="xl" color="silver" as={GiTrophy}></Icon>
                      </Td>
                    )}
                    {key == 2 && (
                      <Td width="20px">
                        <Icon
                          fontSize="xl"
                          color="#CD7F32"
                          as={GiTrophy}
                        ></Icon>
                      </Td>
                    )}
                  </>
                )}
                <Td width="20px">
                  <Switch isChecked={team.inChart} id="email-alerts" />
                </Td>
                <Td minW="200px">{team.teamName}</Td>
                <Td width="100px">{team.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TableContainer
        minW={calculateMinWidth}
        overflowX={calculateOverflow}
        overflowY="visible"
      >
        <Table
          variant="unstyled"
          width="fit-content"
          className="rotated-header solve-table table-right"
        >
          <Thead>
            <Tr>
              {Object.entries(challengesList).map(([key, challenge]) => (
                <Th key={key}>
                  <div className="rotated-header-container">
                    <div className="rotated-header-content">
                      {challenge.name}
                    </div>
                  </div>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(teams).map(([key, team]) => (
              <Tr key={key}>
                {Object.entries(challengesList).map(([key, challenge]) => (
                  <Td key={key} className="table-solve-icon-container">
                    <Center>
                      {team.solveStatus[key].solved && (
                        <>
                          {team.solveStatus[key].rank === 1 && (
                            <Icon
                              fontSize="xl"
                              color="#bf3d3d"
                              as={GiDrop}
                            ></Icon>
                          )}
                          {team.solveStatus[key].rank === 2 && (
                            <Icon
                              fontSize="xl"
                              color="silver"
                              as={GiMedal}
                            ></Icon>
                          )}
                          {team.solveStatus[key].rank === 3 && (
                            <Icon
                              fontSize="xl"
                              color="#CD7F32"
                              as={GiMedal}
                            ></Icon>
                          )}
                          {team.solveStatus[key].rank > 3 && (
                            <Icon as={FaFlag} />
                          )}
                        </>
                      )}
                    </Center>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </HStack>
  );
}

export default ScoreTable;
