import React from 'react'
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
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

function ChallengeSolvesTable() {
    const selectedChallenge = useSelector((state) => state.challenge.selectedChallenge)
    return (
        <>
        {selectedChallenge.solves.length === 0 ?
            <>
                <Center w="100%">
                    No solves yet
                </Center>
            </>
            :
            <TableContainer maxH='600px' overflowY="auto" w='100%' marginRight="3px" marginBottom="25px" padding="0px 40px 0px 45px">
            <Table maxH='600px' w='100%' variant='simple'>
                <Thead w='100%' position='sticky' top={0} zIndex="docked" backgroundColor="#211a52">
                    <Tr >
                        <Th color="#dfdfe3">Team</Th>
                        <Th color="#dfdfe3">Date</Th>
                    </Tr>                                  
                </Thead>
                <Tbody>
                    {Object.entries(selectedChallenge.solves).map(([key, solve]) => (
                    <Tr key={key}>
                        <Td>{solve.team}</Td>
                        <Td>{solve.date}</Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>


            </TableContainer>
        }
        </>        
    )
}

export default ChallengeSolvesTable