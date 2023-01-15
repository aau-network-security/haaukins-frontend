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
import ReactTooltip from 'react-tooltip';

export default function NavItem({ icon, title, navSize, to, customClickEvent }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                    <Link
                        as={ReactLink}
                        _activeLink={{backgroundColor: "#211a52", color: "#fff"}}
                        p={"12px 12px 5px 12px"}
                        borderRadius={8}
                        _hover={{ textDecor: 'none', backgroundColor: "#211a52", color: "#FFF"}}
                        w={navSize === "large" && "100%"}
                        to={to}
                        data-tip={title}
                        data-place="right"
                        data-effect="solid"
                        data-background-color="#211a52"
                        onClick={customClickEvent}
                    >                        
                            <MenuButton w="100%" lineHeight={1.35} >
                                <Flex>
                                    <Icon as={icon} fontSize="xl" />
                                    <Text ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
                                </Flex>
                            </MenuButton>
                    </Link>
                    <ReactTooltip/>
                {/* <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList> */}
            </Menu>
        </Flex>
    )
}
