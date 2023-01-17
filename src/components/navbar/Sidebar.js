import React, { useState } from 'react'
import {
    Flex as Box,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Icon,
    MenuButton,
    Menu,
    Spacer,
    Flex
} from '@chakra-ui/react'
import {
    FiCalendar,
    FiLogOut,
    FiSettings
} from 'react-icons/fi'
import { FaRegBuilding, FaFlagCheckered, FaNetworkWired, FaUsers } from 'react-icons/fa'
import { RiDashboardLine, RiUserSettingsLine } from 'react-icons/ri'
import NavItem from './NavItem'
import Logo from '../Logo'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/users/userSlice'

// TODO new logos
export default function Sidebar() {
    const [navSize, changeNavSize] = useState("small") // Used for the menu buttom which is also commented out below
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser())
    }
    const loggedInUser = useSelector((state) => state.user.loggedInUser)

    return (
        <Flex
            backgroundColor="white"
            pos="sticky"
            h="75px"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w="100%"
            flexDir="row"
            justifyContent="space-between"
        >
            <Box
                flexDir="row"
                w="100%"
                alignItems="center"
                as="nav"
            >   
                <h1>Event Title</h1>                 
            </Box>
            <Spacer/>
            <Box
                flexDir="row"
                w="100%"
                alignItems="center"
                as="nav"
            >

                <NavItem navSize={navSize} icon={RiDashboardLine} title="Dashboard" to="/" />
                <NavItem navSize={navSize} icon={FiCalendar} title="Events" to="/events" />
                <NavItem navSize={navSize} icon={FaFlagCheckered} title="Challenges" to="/challenges" />
                <NavItem navSize={navSize} icon={RiUserSettingsLine} title="Profile" to="/profile" />
            </Box>
            <Spacer/>

            <Box
                flexDir="row"
                w="33%"
                alignItems="flex-right"
                as="nav"
            >
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