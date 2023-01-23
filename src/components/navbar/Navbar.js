import React, { useEffect, useState } from 'react'
import {
    Button,
    Flex as Box,
    Flex,
    HStack
} from '@chakra-ui/react'
import {
    FiLogOut,
    FiLogIn
} from 'react-icons/fi'
import { FaFlagCheckered, FaNetworkWired, FaQuestion } from 'react-icons/fa'
import { NavLink as ReactLink } from 'react-router-dom'
import { RiUserSettingsLine, RiTeamLine } from 'react-icons/ri'
import { SlGraph } from 'react-icons/sl'
import NavItem from './NavItem'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/users/userSlice'
import { Link } from 'react-router-dom'
import ConfigureLabMenu from './ConfigureLabMenu'

// TODO new logos
export default function Navbar() {
    const [navSize, changeNavSize] = useState("large") // Used for the menu buttom which is also commented out below
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser())
    }
    const loggedInUser = useSelector((state) => state.user.loggedInUser)
    const scrolledToTop = useSelector((state) => state.generic.scrolledToTop)

    const [width, setWindowWidth] = useState(0);
    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

    useEffect(() => { 
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        console.log("width and navsize: ", width, navSize)
        if (width >= 1250 ) {
            changeNavSize("large")
        } else if (width < 1250 && width >= 850 ) {
            changeNavSize("medium")
        } else if (width < 850) {
            changeNavSize("small")
        }
        return () => 
            window.removeEventListener("resize", updateDimensions);
    })

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
            zIndex="1100"
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
                    <NavItem navSize={navSize} displayTooltip={false} displayTitle icon={RiTeamLine} title="Teams" to="/teams" />
                    <NavItem navSize={navSize} displayTooltip={false} displayTitle icon={SlGraph} title="Scoreboard" to="/scoreboard" />
                    <NavItem navSize={navSize} displayTooltip={false} displayTitle icon={FaFlagCheckered} title="Challenges" to="/challenges" />
                    <NavItem navSize={navSize} displayTooltip={false} displayTitle icon={FaNetworkWired} title="Lab" to="/lab" />
                    <NavItem navSize={navSize} displayTooltip={false} displayTitle icon={FaQuestion} title="FAQ" to="/faq" />
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
                <ConfigureLabMenu/>
                <NavItem navSize={navSize} displayTooltip={true} icon={RiUserSettingsLine} title="Profile" to="/profile"/>
                <NavItem navSize={navSize} displayTooltip={true} icon={FiLogOut} title="Logout" to="/login" customClickEvent={logout}/>
                
                
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