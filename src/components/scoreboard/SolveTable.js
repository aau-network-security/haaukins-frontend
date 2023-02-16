import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Icon,
  Switch,
  HStack,
  Input,
  Box,
} from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa";
import { GiDrop, GiTrophy, GiMedal } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import { setTableData } from "../../features/scores/scoreSlice";
import { debounce } from "lodash";

function ScoreTable() {
  const teamScores = useSelector((state) => state.score.scores);
  const tableData = useSelector((state) => state.score.tableData);
  const challengesList = useSelector((state) => state.score.challengesList);
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState("");

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
  
  const changeSearchData = (text, scores) => {
    if (text === "") {
      dispatch(setTableData(cloneDeep(scores)));
    } else {
      dispatch(setTableData(
        cloneDeep(scores.filter((el) => {
          return el.teamName.toLowerCase().indexOf(text.toLowerCase()) > -1;
        }))
      ));
    }
  };

  const debounceLoadData = useCallback(debounce(changeSearchData, 500), []); 

  

  useEffect(() => {
      debounceLoadData(searchValue, teamScores);
  }, [searchValue])

  useEffect(() => {
    debounceLoadData(searchValue, teamScores);
  }, [teamScores])

  return (
    <Box w="100%" className="solve-table-container" style={{caretColor: "black"}}>
      <Input
        placeholder="Search Teams"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        w="300px"
        top="60px"
        borderColor="#211a52"
      />
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
              {Object.entries(tableData).map(([key, team]) => (
                <Tr key={String(key)}>
                  {team.rank > 3 ? (
                    <Td textAlign="center" width="20px">
                      {team.rank}
                    </Td>
                  ) : (
                    <>
                      {team.rank == 1 && (
                        <Td width="20px">
                          <Icon
                            fontSize="xl"
                            color="#FFD700"
                            as={GiTrophy}
                          ></Icon>
                        </Td>
                      )}
                      {team.rank == 2 && (
                        <Td width="20px">
                          <Icon
                            fontSize="xl"
                            color="silver"
                            as={GiTrophy}
                          ></Icon>
                        </Td>
                      )}
                      {team.rank == 3 && (
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
              {Object.entries(tableData).map(([key, team]) => (
                <Tr key={key}>
                  {Object.entries(challengesList).map(([key, challenge]) => (
                    <Td key={key} className="table-solve-icon-container">
                      <Center>
                        {team.solves[challenge.tag] && (
                          <>
                            {team.solves[challenge.tag].rank === 1 && (
                              <Icon
                                fontSize="xl"
                                color="#bf3d3d"
                                as={GiDrop}
                              ></Icon>
                            )}
                            {team.solves[challenge.tag].rank === 2 && (
                              <Icon
                                fontSize="xl"
                                color="silver"
                                as={GiMedal}
                              ></Icon>
                            )}
                            {team.solves[challenge.tag].rank === 3 && (
                              <Icon
                                fontSize="xl"
                                color="#CD7F32"
                                as={GiMedal}
                              ></Icon>
                            )}
                            {team.solves[challenge.tag].rank > 3 && (
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
    </Box>
  );
}

export default ScoreTable;
