import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
    Text,
    background,
  } from '@chakra-ui/react'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function ConfigureLabMenu() {
    const scrolledToTop = useSelector((state) => state.generic.scrolledToTop)
    const configureVpnLab = () => {
        console.log("configuring vpn lab")
    }

    const configureBrowserLab = () => {
        console.log("configuring browser lab")
    }
  return (
    <>
    <Flex
        
    >
        <Menu >
            <MenuButton 
                as={Button}  
                backgroundColor={scrolledToTop ? "#54616e" : "#dfdfe3"} 
                color={scrolledToTop ? "#dfdfe3": "#54616e" } 
                rightIcon={<FaChevronDown />}
                _hover={scrolledToTop ? {backgroundColor: "#a9b3bc"} : {backgroundColor: "#c8c8d0"}}
            >
                <Text>Configure Lab</Text>
            </MenuButton>
            <MenuList>
                <MenuItem onClick={configureVpnLab}>VPN</MenuItem>
                <MenuItem onClick={configureBrowserLab}>Browser</MenuItem>
            </MenuList>
        </Menu>
    </Flex>
        
        
    </>
  )
}
