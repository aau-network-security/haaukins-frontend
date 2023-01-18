import React, { useState } from 'react'
import {
    Flex as Box,
    Flex,
    HStack
} from '@chakra-ui/react'
import {
    FiLogOut
} from 'react-icons/fi'
import { FaFlagCheckered, FaNetworkWired, FaQuestion } from 'react-icons/fa'
import { NavLink as ReactLink } from 'react-router-dom'
import { RiUserSettingsLine, RiTeamLine } from 'react-icons/ri'
import { SlGraph } from 'react-icons/sl'
import NavItem from './NavItem'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/users/userSlice'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'

// TODO new logos
export default function Sidebar() {
    const [navSize, changeNavSize] = useState("small") // Used for the menu buttom which is also commented out below
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser())
    }
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const scrolledToTop = useSelector((state) => state.generic.scrolledToTop)

    return (
        <Flex
            backgroundColor={scrolledToTop ? '#fff' : '#211a52'}
            pos="sticky"
            top="0"
            h="75px"
            w="100%"
            flexDir="row"
            fontWeight="bold"
            bg={scrolledToTop ? "transparent" : "solid"}
            justifyContent="space-between"
        >
            <Box
                flexDir="row"
                w="fit-content"
                marginLeft="25px"
                alignItems="center"
                h="75px"
                color={scrolledToTop ? "#54616e" : "#dfdfe3"}
                position="fixed"
                fontSize="35px"
                as="nav"
            >   
                <Link
                    as={ReactLink}
                    _hover={{ textDecor: 'none'}}
                    to={"/"}
                >Event Title</Link>                 
            </Box>

            <Box
                flexDir="row"
                w="fit-content"
                display="flex"
                top="0"
                margin="auto"
                alignItems="center"
                as="nav"
            >   
                <HStack spacing="20px">
                    <NavItem navSize={navSize} displayTitle icon={RiTeamLine} title="Teams" to="/teams" />
                    <NavItem navSize={navSize} displayTitle icon={SlGraph} title="Scoreboard" to="/scoreboard" />
                    <NavItem navSize={navSize} displayTitle icon={FaFlagCheckered} title="Challenges" to="/challenges" />
                    <NavItem navSize={navSize} displayTitle icon={FaNetworkWired} title="Labinfo" to="/labinfo" />
                    <NavItem navSize={navSize} displayTitle icon={FaQuestion} title="FAQ" to="/faq" />
                </HStack>  
            </Box>

            <Box
                flexDir="row"
                w="fit-content"
                right="0"
                m="15.639px 20px 15.639px 0px"
                position="fixed"
                alignItems="center"
                as="nav"
            >
                <NavItem navSize={navSize} icon={RiUserSettingsLine} title="Profile" to="/profile"/>
                <NavItem navSize={navSize} icon={FiLogOut} title="Logout" to="/login" customClickEvent={logout}/>
                
                {/* <Menu placement="right" p={"12px 12px 5px 12px"} _hover={{ textDecor: 'none', backgroundColor: "#211a52", color: "#FFF"}} >
                    <MenuButton w="100%" lineHeight={1.35} >
                        <Flex>
                            <Icon as={FiLogOut} fontSize="xl" />
                            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>Logout</Text>
                        </Flex>
                    </MenuButton>
                </Menu> */}
                </Box>
        </Flex>
    )
}