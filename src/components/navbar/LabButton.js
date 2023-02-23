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
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import MultipleVmConnectBotton from "./MultipleVmConnectBotton";
import { Tooltip } from "react-tooltip";

export default function LabButton() {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const [connectUrl, setConnectUrl] = useState("");
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const scrolledToTop = useSelector((state) => state.generic.scrolledToTop);
  const configureVpnLab = () => {
    console.log("configuring vpn lab");
  };

  useEffect(() => {
    if (typeof loggedInTeam.lab !== "undefined") {
      let host = loggedInTeam.lab.parentAgent.url.split(":")[0];
      let baseurl = "http://" + eventInfo.tag + "." + host;
      if (loggedInTeam.lab.parentAgent.tls) {
        baseurl = "https://" + eventInfo.tag + "." + host;
      }
      if (loggedInTeam.lab.parentAgent.tls) {
        setConnectUrl(
          baseurl +
            "/guaclogin" +
            "?username=" +
            loggedInTeam.lab.labInfo.guacCreds.username +
            "&password=" +
            loggedInTeam.lab.labInfo.guacCreds.password
        );
      } else {
        setConnectUrl(
          baseurl +
            "/guaclogin" +
            "?username=" +
            loggedInTeam.lab.labInfo.guacCreds.username +
            "&password=" +
            loggedInTeam.lab.labInfo.guacCreds.password
        );
      }
    }
  }, [loggedInTeam]);

  const configureBrowserLab = () => {
    console.log("configuring browser lab");
  };
  return (
    <>
      <Flex>
        {typeof loggedInTeam.lab !== "undefined" ? (
          <>
            {!loggedInTeam.lab.labInfo.isVpn &&
            eventInfo.teamSize === 1 &&
            loggedInTeam.status === "idle" ? (
              <Link
                href={connectUrl}
                target="_blank"
                _hover={{ textDecor: "none" }}
              >
                <Button
                  backgroundColor={scrolledToTop ? "#54616e" : "#dfdfe3"}
                  color={scrolledToTop ? "#dfdfe3" : "#54616e"}
                  _hover={
                    scrolledToTop
                      ? { backgroundColor: "#a9b3bc" }
                      : { backgroundColor: "#c8c8d0" }
                  }
                >
                  <Text>Connect to lab</Text>
                </Button>
              </Link>
            ) : !loggedInTeam.lab.labInfo.isVpn &&
              eventInfo.teamSize !== 1 &&
              loggedInTeam.status === "idle" ? (
              <MultipleVmConnectBotton />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {eventInfo.isMaxLabsReached && loggedInTeam.status === "idle" ? (
              <>
                <Box id="maxlabsbutton">
                  <Button isDisabled>Max labs reached</Button>
                </Box>
                <Tooltip
                  anchorId="maxlabsbutton"
                  place="bottom"
                  html="Max labs for event has been reached. <br> New labs may be available at a later time. <br> Meanwhile you can solve challenges which <br> do not require a lab"
                  multiline
                />
              </>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  backgroundColor={scrolledToTop ? "#54616e" : "#dfdfe3"}
                  color={scrolledToTop ? "#dfdfe3" : "#54616e"}
                  rightIcon={<FaChevronDown />}
                  _hover={
                    scrolledToTop
                      ? { backgroundColor: "#a9b3bc" }
                      : { backgroundColor: "#c8c8d0" }
                  }
                  isLoading={loggedInTeam.status === "idle" ? false : true}
                >
                  <Text>Configure Lab</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={configureVpnLab}>VPN</MenuItem>
                  <MenuItem onClick={configureBrowserLab}>Browser</MenuItem>
                </MenuList>
              </Menu>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
