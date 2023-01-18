import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
} from '@chakra-ui/react'
import { NavLink as ReactLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function NavItem({ icon, title, navSize, to, customClickEvent, displayTitle}) {
    const scrolledToTop = useSelector((state) => state.generic.scrolledToTop)
    return (
        <Flex
            flexDir="row"
            w="100%"
            alignItems="center"
            className={scrolledToTop ? "hover-underline-animation" : "hover-underline-animation-light" }
            color={scrolledToTop ? "" : "#dfdfe3"}
        >
            <Menu placement="right">
                    <Link
                        as={ReactLink}
                        p={"12px 12px 5px 12px"}
                        borderBottom="3px solid transparent"
                        _activeLink={scrolledToTop ? {borderBottom: "solid", borderBottomRadius: "0", borderBottomColor: "#211a52"} : {borderBottom: "solid", borderBottomRadius: "0", borderBottomColor: "#dfdfe3"}}
                        _hover={{ textDecor: 'none'}}
                        w={navSize === "large" && "100%"}
                        to={to}
                        onClick={customClickEvent}
                    >                        
                            <MenuButton w="100%" lineHeight={1.35} >
                                <Flex>
                                    <Icon as={icon} fontSize="xl" />
                                    <Text ml={5} display={displayTitle === true ? "flex" : "none"}>{title}</Text>
                                </Flex>
                            </MenuButton>
                    </Link>
                    {/* _hover={{ textDecor: 'none', backgroundColor: "#211a52", color: "#FFF"}} */}
                    {/* _activeLink={{backgroundColor: "#211a52", color: "#fff"}} */}
                    {/* _activeLink={{borderBottom: "solid", borderBottomRadius: "0", borderBottomColor: "#211a52"}} */}
            </Menu>
        </Flex>
    )
}
