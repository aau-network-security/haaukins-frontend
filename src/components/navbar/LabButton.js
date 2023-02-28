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
import { useDispatch, useSelector } from "react-redux";
import MultipleVmConnectBotton from "./MultipleVmConnectButton";
import { Tooltip } from "react-tooltip";
import { configureLab } from "../../features/teams/teamSlice";

export default function LabButton() {
  const dispatch = useDispatch()

  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const [connectUrl, setConnectUrl] = useState("");
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const scrolledToTop = useSelector((state) => state.generic.scrolledToTop);
  const configureVpnLab = () => {
    console.log("configuring vpn lab");
    let reqData = {
      isVpn: true,
    }
    dispatch(configureLab(reqData))
  };
  const configureBrowserLab = () => {
    console.log("configuring browser lab");
    let reqData = {
      isVpn: false,
    }
    dispatch(configureLab(reqData))
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
              <>
                {eventInfo.type === "beginner" ? (
                  <Box>
                    <Button onClick={configureBrowserLab}>Get a lab</Button>
                  </Box>
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
                      <Text>Get a lab</Text>
                    </MenuButton>
                    <MenuList>
                      <Link id="vpn-lab-button" _hover={{ textDecor: "none" }}>
                        <MenuItem onClick={configureVpnLab}>VPN</MenuItem>
                      </Link>

                      <Tooltip
                        anchorId="vpn-lab-button"
                        place="left"
                        html="Get access to the challenges through wireguard VPN <br> If you are a team, each member will get access their own VPN connection"
                        multiline
                      />
                      <Link
                        id="browser-lab-button"
                        _hover={{ textDecor: "none" }}
                      >
                        <MenuItem onClick={configureBrowserLab}>
                          Browser
                        </MenuItem>
                      </Link>
                      <Tooltip
                        anchorId="browser-lab-button"
                        place="left"
                        html="Get a Kali VM served in a browser window <br> If you are a team, each member will get access to their own VM"
                        multiline
                      />
                    </MenuList>
                  </Menu>
                )}
              </>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
