import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Icon,
  Switch,
} from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa";
import { GiDrop, GiTrophy } from "react-icons/gi";

function ScoreTable() {
  const challengesList = [
    { name: "Challenge1", tag: "challenge-1" },
    { name: "Challenge2", tag: "challenge-2" },
    { name: "Challenge3", tag: "challenge-3" },
    { name: "Challenge4", tag: "challenge-4" },
    { name: "Challenge5", tag: "challenge-5" },
    { name: "Challenge6", tag: "challenge-6" },
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
      ],
    },
    {
      teamName: "team5",
      inChart: true,
      score: 996,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 10 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
      ],
    },
    {
      teamName: "team6",
      inChart: true,
      score: 995,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: false, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
      ],
    },
    {
      teamName: "team7",
      inChart: true,
      score: 994,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: false, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
      ],
    },
    {
      teamName: "team8",
      inChart: true,
      score: 993,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: false, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
      ],
    },
    {
      teamName: "team9",
      inChart: true,
      score: 992,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: false, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
      ],
    },
    {
      teamName: "team10",
      inChart: true,
      score: 991,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: true, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: true, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
      ],
    },
    {
      teamName: "team11",
      inChart: false,
      score: 990,
      solveStatus: [
        { name: "Challenge1", tag: "challenge-1", solved: true, rank: 1 },
        { name: "Challenge2", tag: "challenge-2", solved: true, rank: 2 },
        { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
        { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
        { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
        { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
      ],
    },
  ];
  return (
    <TableContainer overflowX="visible" overflowY="visible">
      <Table variant="unstyled" className="rotated-header solve-table">
        <Thead>
          <Tr>
            <Th textAlign="center">#</Th>
            <Th>In Chart</Th>
            <Th>Team</Th>
            <Th>Score</Th>
            {Object.entries(challengesList).map(([key, challenge]) => (
              <Th key={key}>
                <div class="rotated-header-container">
                  <div class="rotated-header-content">{challenge.name}</div>
                </div>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(teams).map(([key, team]) => (
            <Tr key={key}>
              
              {key > 2 ? (
                    <Td textAlign="center" width="20px">{Number(key) + 1}</Td>
                  ) : (
                    <>
                      {key == 0 && (
                        <Td width="20px">
                          <Icon fontSize="xl" color="#FFD700" as={GiTrophy}></Icon>
                        </Td>
                      )}
                      {key == 1 && (
                        <Td width="20px">
                          <Icon fontSize="xl" color="silver" as={GiTrophy}></Icon>
                        </Td>
                      )}
                      {key == 2 && (
                        <Td width="20px">
                          <Icon fontSize="xl" color="#CD7F32" as={GiTrophy}></Icon>
                        </Td>
                      )}
                    </>
                  )}
              <Td width="20px">
                <Switch isChecked={team.inChart} id="email-alerts" />
              </Td>
              <Td>{team.teamName}</Td>
              <Td width="100px">{team.score}</Td>
              {Object.entries(challengesList).map(([key, challenge]) => (
                <Td className="table-solve-icon-container">
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
                            as={GiTrophy}
                          ></Icon>
                        )}
                        {team.solveStatus[key].rank === 3 && (
                          <Icon
                            fontSize="xl"
                            color="#CD7F32"
                            as={GiTrophy}
                          ></Icon>
                        )}
                        {team.solveStatus[key].rank > 3 && <Icon as={FaFlag} />}
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
  );
}

export default ScoreTable;
