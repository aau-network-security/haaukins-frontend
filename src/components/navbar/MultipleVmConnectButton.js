import {
  Button,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdRefresh } from "react-icons/md"
import { Tooltip } from "react-tooltip";
import AlertDialogResetVm from "../AlertDialogResetVm";
import { resetVm } from "../../features/labs/labSlice";

function MultipleVmConnectBotton() {
  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const scrolledToTop = useSelector((state) => state.generic.scrolledToTop);
  const [connectionUrls, setConnectionUrls] = useState([]);

  useEffect(() => {
    let host = loggedInTeam.lab.parentAgent.url.split(":")[0];
    let baseurl = "http://" + eventInfo.tag + "." + host;
    if (loggedInTeam.lab.parentAgent.tls) {
      baseurl = "https://" + eventInfo.tag + "." + host;
    }
    let payload = new URLSearchParams({
      username: loggedInTeam.lab.labInfo.guacCreds.username,
      password: loggedInTeam.lab.labInfo.guacCreds.password,
    });
    fetch(baseurl + "/guacamole/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    })
      .then(function (res) {
        if (!res.ok) {
          console.log("error getting guacamole token");
          throw new Error("HTTP status " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        fetch(
          baseurl +
            "/guacamole/api/session/data/mysql/connectionGroups/ROOT/tree",
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,da-DK;q=0.8,da;q=0.7,es;q=0.6",
              "cache-control": "no-cache",
              "guacamole-token": data.authToken,
              pragma: "no-cache",
            },
            referrer: baseurl + "/guacamole/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
          }
        )
          .then(function (res) {
            if (!res.ok) {
              console.log("error getting guacamole token");
              throw new Error("HTTP status " + res.status);
            }
            return res.json();
          })
          .then(function (data) {
            let connectionUrls = [];
            setConnectionUrls(connectionUrls);
            data.childConnections.forEach((connection) => {
              console.log(connection);
              let clientId =
                connection.identifier + "\0" + "c" + "\0" + "mysql";
              let base64clientId = Buffer.from(clientId).toString("base64");
              console.log(base64clientId);
              let connectionUrl = {
                url:
                  baseurl +
                  "/guaclogin" +
                  "?username=" +
                  loggedInTeam.lab.labInfo.guacCreds.username +
                  "&password=" +
                  loggedInTeam.lab.labInfo.guacCreds.password +
                  "&vid=" +
                  base64clientId,
                connectionIdentifier: connection.identifier
              };

              setConnectionUrls((connectionUrls) => [
                ...connectionUrls,
                connectionUrl,
              ]);
            });
          });
      });
  }, [loggedInTeam]);

  const dispatch = useDispatch()
  const toast = useToast()
  const toastIdRef = React.useRef()

  const vmReset = async (connectionIdentifier) => {
    console.log("Resetting vm with identifier: ", connectionIdentifier)
    let request = {
      connectionIdentifier: connectionIdentifier,
    }
    try {
      const response = await dispatch(resetVm(request)).unwrap()
      toastIdRef.current = toast({
        title: 'Vm successfully reset',
        description: "Your vm reset request was processed successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: 'Error resetting vm',
        description: err.apiError.status,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [vmNameState, setVmNameState] = useState("")
  const [connectionIdentifierState, setConnectionIdentifierState]= useState("")
  const onAlertClose = () => setIsAlertOpen(false)
  const cancelRef = React.useRef()

  const openAlertDialog = (vmName, connectionIdentifier) => {
    console.log("Opening alert dialog with: ", vmName, connectionIdentifier)
    setVmNameState(vmName)
    setConnectionIdentifierState(connectionIdentifier)
    setIsAlertOpen(true)
  }

  const stateStatus = useSelector((state) => state.lab.status);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  

  useEffect(() => {
    if (loggedInTeam.status === "runningVmCommand" && stateStatus !== "resetting-vm") {
      setIsDisabled(true)
      setIsLoading(false)
    } else if (loggedInTeam.status === "runningVmCommand" && stateStatus === "resetting-vm") {
      setIsLoading(true)
      setIsDisabled(false)
    } else if (stateStatus === "resetting-vm") {
      setIsLoading(true)
      setIsDisabled(false)
    } else {
      setIsLoading(false)
      setIsDisabled(false)
    }
  }, [stateStatus, loggedInTeam])

  return (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor={scrolledToTop ? "#54616e" : "#dfdfe3"}
        color={scrolledToTop ? "#dfdfe3" : "#54616e"}
        rightIcon={<FaChevronDown />}
        _hover={
          scrolledToTop
            ? { backgroundColor: "#434d56" }
            : { backgroundColor: "#c8c8d0" }
        }
      >
        <Text>Connect to lab</Text>
      </MenuButton>
      <MenuList>
        {Object.entries(connectionUrls).map(([key, connectionUrl]) => (
          <HStack key={key} marginTop="5px" marginLeft="10px" spacing="0">
            <IconButton 
              icon={<MdRefresh fontSize="18px"/>}
              id={"connection-"+connectionUrl.connectionIdentifier}
              backgroundColor="#54616e"
              _hover={{ backgroundColor: "#434d56" }}
              color="#dfdfe3"
              variant="solid"
              onClick={() => openAlertDialog("VM " + (Number(key)+1), connectionUrl.connectionIdentifier)}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
            
            <Link
              href={connectionUrl.url}
              target="_blank"
              _hover={{ textDecor: "none" }}
              width="100%"
            >
              <MenuItem>
                <Text>VM {Number(key) + 1}</Text>
              </MenuItem>
            </Link>
            <Tooltip 
              anchorId={"connection-"+connectionUrl.connectionIdentifier}
              content={"Reset VM " + (Number(key) + 1)}
            />
          </HStack>
          
        ))}
      </MenuList>
      <AlertDialogResetVm
        vmName={vmNameState}
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        cancelRef={cancelRef}
        resetVm={vmReset}
        connectionIdentifier={connectionIdentifierState}
      />
    </Menu>
  );
}

export default MultipleVmConnectBotton;
