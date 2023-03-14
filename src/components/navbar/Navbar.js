import React, { useEffect, useState } from "react";
import {
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex as Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaFlagCheckered, FaNetworkWired, FaQuestion } from "react-icons/fa";
import { MdOutlinedFlag } from "react-icons/md";
import { NavLink as ReactLink } from "react-router-dom";
import { RiUserSettingsLine, RiUserAddLine } from "react-icons/ri";
import { SlGraph } from "react-icons/sl";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { logoutTeam } from "../../features/teams/teamSlice";
import { Link } from "react-router-dom";
import LabButton from "./LabButton";

// TODO new logos
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [navSize, changeNavSize] = useState("large"); // Used for the menu buttom which is also commented out below
  const dispatch = useDispatch();
  const logout = () => {
    onClose()
    dispatch(logoutTeam());
  };
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const scrolledToTop = useSelector((state) => state.generic.scrolledToTop);

  const [width, setWindowWidth] = useState(0);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    console.log("navsize", navSize);
    window.addEventListener("resize", updateDimensions);
    if (width >= 1250) {
      changeNavSize("large");
    } else if (width < 1250 && width >= 950) {
      changeNavSize("medium");
    } else if (width < 950) {
      changeNavSize("small");
    }
    return () => window.removeEventListener("resize", updateDimensions);
  });

  return (
    <Flex
      backgroundColor={scrolledToTop ? "#fff" : "#211a52"}
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
        <Link as={ReactLink} _hover={{ textDecor: "none" }} to={"/"}>
          {eventInfo.name}
        </Link>
      </Box>

      <Box
        flexDir="row"
        w="fit-content"
        display={navSize === "small" ? "none" : "flex"}
        top="0"
        margin="auto"
        alignItems="center"
        as="nav"
      >
        <HStack spacing="20px">
          {/* <NavItem navSize={navSize} displayTooltip={false} displayTitle icon={RiTeamLine} title="Teams" to="/teams" /> */}
          <NavItem
            navSize={navSize}
            displayTooltip={false}
            displayTitle
            scrollSensitive={true}
            icon={MdOutlinedFlag}
            title="Challenges"
            to="/challenges"
          />
          <NavItem
            navSize={navSize}
            displayTooltip={false}
            displayTitle
            scrollSensitive={true}
            icon={SlGraph}
            title="Scoreboard"
            to="/scoreboard"
          />
          {typeof loggedInTeam.username !== "undefined" && (
            <>
              <NavItem
                navSize={navSize}
                displayTooltip={false}
                displayTitle
                scrollSensitive={true}
                icon={FaNetworkWired}
                title="Hosts"
                to="/hosts"
              />
              <NavItem
                navSize={navSize}
                displayTooltip={false}
                displayTitle
                scrollSensitive={true}
                icon={FaQuestion}
                title="FAQ"
                to="/faq"
              />
            </>
          )}
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
        {typeof loggedInTeam.username !== "undefined" ? (
          <>
            <LabButton />
            
            <IconButton
              marginLeft="10px"
              bg={scrolledToTop ? "#211a52" : "#dfdfe3"}
              color={scrolledToTop ? "white" : "#54616e"}
              _hover={scrolledToTop ? { bg: "#18123a" } : { bg: "#c8c8d0" }}
              icon={<HamburgerIcon />}
              display={navSize === "small" ? "flex" : "none"}
              onClick={onOpen}
            />
            <HStack
              marginLeft="10px"
              spacing="10px"
              display={navSize === "small" ? "none" : "flex"}
            >
              <NavItem
                navSize={navSize}
                displayTooltip={true}
                scrollSensitive={true}
                icon={RiUserSettingsLine}
                title="Profile"
                to="/profile"
              />
              <NavItem
                navSize={navSize}
                scrollSensitive={true}
                displayTooltip={true}
                icon={FiLogOut}
                title="Logout"
                to="/login"
                customClickEvent={logout}
              />
            </HStack>
          </>
        ) : (
          <>
          <IconButton
              marginLeft="10px"
              bg={scrolledToTop ? "#211a52" : "#dfdfe3"}
              color={scrolledToTop ? "white" : "#54616e"}
              _hover={scrolledToTop ? { bg: "#18123a" } : { bg: "#c8c8d0" }}
              icon={<HamburgerIcon />}
              display={navSize === "small" ? "flex" : "none"}
              onClick={onOpen}
            />
            <HStack
            spacing="10px"
            display={navSize === "small" ? "none" : "flex"}
          >
            
            <NavItem
              navSize={navSize}
              scrollSensitive={true}
              displayTooltip={true}
              icon={RiUserAddLine}
              title="Signup"
              to="/signup"
            />
            <NavItem
              navSize={navSize}
              scrollSensitive={true}
              displayTooltip={true}
              icon={FiLogIn}
              title="Login"
              to="/login"
            />
          </HStack>
          </>
        )}
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent color={"#dfdfe3"} backgroundColor={"#211a52"}>
            <DrawerCloseButton />
            <DrawerHeader fontSize="35px">
              <Link as={ReactLink} _hover={{ textDecor: "none" }} to={"/"}>
                {eventInfo.name}
              </Link>
            </DrawerHeader>
            <DrawerBody>
              <Center width="fit-content" margin="auto">
                <NavItem
                  navSize={"large"}
                  scrollSensitive={false}
                  displayTooltip={false}
                  displayTitle
                  icon={MdOutlinedFlag}
                  title="Challenges"
                  to="/challenges"
                  customClickEvent={onClose}
                />
              </Center>
              <Center width="fit-content" margin="auto">
                <NavItem
                  navSize={"large"}
                  scrollSensitive={false}
                  displayTooltip={false}
                  displayTitle
                  icon={SlGraph}
                  title="Scoreboard"
                  to="/scoreboard"
                  customClickEvent={onClose}
                />
              </Center>
              {typeof loggedInTeam.username !== "undefined" && (
                <>
                  <Center width="fit-content" margin="auto">
                    <NavItem
                      navSize={"large"}
                      scrollSensitive={false}
                      displayTooltip={false}
                      displayTitle
                      icon={FaNetworkWired}
                      title="Hosts"
                      to="/hosts"
                      customClickEvent={onClose}
                    />
                  </Center>
                  <Center width="fit-content" margin="auto">
                    <NavItem
                      navSize={"large"}
                      scrollSensitive={false}
                      displayTooltip={false}
                      displayTitle
                      icon={FaQuestion}
                      title="FAQ"
                      to="/faq"
                      customClickEvent={onClose}
                    />
                  </Center>
                </>
              )}
              {typeof loggedInTeam.username !== "undefined" ? (
                <>
                  <HStack
                    spacing="10px"
                    width="300px"
                    margin="auto"
                    marginTop="30px"
                    display={navSize === "small" ? "flex" : "none"}
                  >
                    <NavItem
                      navSize={"large"}
                      scrollSensitive={false}
                      displayTitle
                      icon={RiUserSettingsLine}
                      title="Profile"
                      to="/profile"
                      customClickEvent={onClose}
                    />
                    <NavItem
                      navSize={"large"}
                      scrollSensitive={false}
                      displayTitle
                      icon={FiLogOut}
                      title="Logout"
                      to="/login"
                      customClickEvent={logout}
                    />
                  </HStack>
                </>
              ) : (
                <HStack
                  spacing="10px"
                  width="300px"
                  margin="auto"
                  marginTop="30px"
                  display={navSize === "small" ? "flex" : "none"}
                >
                  <NavItem
                    navSize={"large"}
                    scrollSensitive={false}
                    displayTitle
                    icon={RiUserAddLine}
                    title="Signup"
                    to="/signup"
                    customClickEvent={onClose}
                  />
                  <NavItem
                    navSize={"large"}
                    scrollSensitive={false}
                    displayTitle
                    icon={FiLogIn}
                    title="Login"
                    to="/login"
                    customClickEvent={onClose}
                  />
                </HStack>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>

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
  );
}
