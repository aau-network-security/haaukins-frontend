import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdRefresh, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { BASE_URL } from "../../api/client";
import { resetVm, closeLab, cancelLabQueue } from "../../features/labs/labSlice";
import { configureLab } from "../../features/teams/teamSlice";
import AlertDialogResetVm from "../AlertDialogResetVm";
import CloseLabAlertDialog from "../CloseLabAlertDialog";
import CancelLabQueueAlertDialog from "../CancelLabQueueAlertDialog";
import MultipleVmConnectBotton from "./MultipleVmConnectButton";

export default function LabButton({display, inDrawer}) {
  const dispatch = useDispatch()

  const loggedInTeam = useSelector((state) => state.team.loggedInTeam);
  const [connectUrl, setConnectUrl] = useState("");
  const eventInfo = useSelector((state) => state.event.eventinfo);
  const scrolledToTop = useSelector((state) => state.generic.scrolledToTop);


  const toast = useToast()
  const toastIdRef = React.useRef()

  const vmReset = async (connectionIdentifier) => {
    console.log("Resetting vm with identifier: ", connectionIdentifier)
    let request = {
      connectionIdentifier: "0",
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

  const [isCloseLabLoading, setIsCloseLabLoading] = useState(false)
  const CloseLab = async () => {
    console.log("Closing lab");
    try {
      setIsCloseLabLoading(true)
      const response = await dispatch(closeLab()).unwrap()
      toastIdRef.current = toast({
        title: "Lab closed",
        description: "Your lab was successfully closed",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsCloseLabLoading(false)
    } catch (err) {
      setIsCloseLabLoading(false)
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Error closing lab",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const [isCancelLabQueueLoading, setIsCancelLabQueueLoading] = useState(false)
  const CancelLabQueue = async () => {
    console.log("Cancelling lab queue");
    try {
      setIsCancelLabQueueLoading(true)
      const response = await dispatch(cancelLabQueue()).unwrap()
      toastIdRef.current = toast({
        title: "Lab queue cancelled",
        description: "Your succesfully cancelled waiting for a lab",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsCancelLabQueueLoading(false)
    } catch (err) {
      setIsCancelLabQueueLoading(false)
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Error cancelling lab queue",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };


  const [isResetLabAlertOpen, setIsResetLabAlertOpen] = useState(false)
  const onResetLabAlertClose = () => setIsResetLabAlertOpen(false)
  const cancelRef = React.useRef()

  const openResetLabAlertDialog = () => {
    console.log("Opening alert dialog")
    setIsResetLabAlertOpen(true)
  }

  const [isCloseLabAlertOpen, setIsCloseLabAlertOpen] = useState(false)
  const onCloseLabAlertClose = () => setIsCloseLabAlertOpen(false)
  const closeRef = React.useRef()

  const openCloseLabAlertDialog = () => {
    console.log("Opening alert dialog")
    setIsCloseLabAlertOpen(true)
  }

  const [isCancelLabQueueAlertOpen, setIsCancelLabQueueAlertOpen] = useState(false)
  const onCancelLabQueueAlertClose = () => setIsCancelLabQueueAlertOpen(false)
  const cancelLabQueueRef = React.useRef()

  const openCancelLabQueueAlertDialog = () => {
    console.log("Opening alert dialog")
    setIsCancelLabQueueAlertOpen(true)
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

  const configureVpnLab = async () => {
    console.log("configuring vpn lab");
    let reqData = {
      isVpn: true,
    }
    
    try {
      const response = await dispatch(configureLab(reqData)).unwrap()
      toastIdRef.current = toast({
        title: "Configuring lab",
        description: "You should receive a lab shortly!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Error configuring lab",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const configureBrowserLab = async () => {
    console.log("configuring browser lab");
    let reqData = {
      isVpn: false,
    }
    try {
      const response = await dispatch(configureLab(reqData)).unwrap()
      toastIdRef.current = toast({
        title: "Configuring lab",
        description: "You should receive a lab shortly!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: "Error configuring lab",
        description: err.apiError.status,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const [vpnDownloadStatus, setVpnDownloadStatus] = useState("idle")
  const createFileFromString = (text, vpnConfIndex) => {
    if (typeof text === "undefined") {
      setVpnDownloadStatus("idle")
      return
    }
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    console.log(vpnConfIndex)
    element.download = "wg-conf-" + (vpnConfIndex + 1) + ".conf";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
    setVpnDownloadStatus("idle")
  }

  const DownloadWgConfig = (vpnConfIndex) => {
    let token = localStorage.getItem("token");
    // Thunk will return error if it cannot pass the value as json
    let endpoint = "labs/vpnconf/" + vpnConfIndex;
    setVpnDownloadStatus("downloading")
    fetch(BASE_URL + endpoint, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      createFileFromString(data.message, vpnConfIndex)
    })
    .catch((error) => { 
      setVpnDownloadStatus("idle")
    });
  }

  const RenderVpnConfButtons = () => {
    let buttons = [];
    for (let i = 0; i < eventInfo.teamSize; i++) {
      buttons.push(
        <MenuItem 
          key={i}
          onClick={() => DownloadWgConfig(i)}  
        >
          <Text color="black">Config {i+1}</Text>
        </MenuItem>
      )
    }

    return buttons
  }

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
      <Flex display={display}>
        {typeof loggedInTeam.lab !== "undefined" ? (
          <>
            {!loggedInTeam.lab.labInfo.isVpn &&
            eventInfo.teamSize === 1 ? (
              <HStack>
                <IconButton 
                  icon={<MdRefresh fontSize="18px"/>}
                  id={"connection"}
                  backgroundColor={!scrolledToTop || inDrawer ? "#dfdfe3" : "#54616e"}
                  color={!scrolledToTop || inDrawer ? "#54616e": "#dfdfe3" }
                  _hover={
                    !scrolledToTop || inDrawer
                      ? { backgroundColor: "#c8c8d0" }
                      : { backgroundColor: "#434d56" }
                  }
                  variant="solid"
                  onClick={() => openResetLabAlertDialog()}
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                />
                <Tooltip 
                  anchorId={"connection"}
                  content={"Reset VM"}
                  place="bottom"
                />
                <Link
                  href={connectUrl}
                  target="_blank"
                  _hover={{ textDecor: "none" }}
                >
                  <Button
                    backgroundColor={!scrolledToTop || inDrawer ? "#dfdfe3" : "#54616e"}
                    color={!scrolledToTop || inDrawer ? "#54616e": "#dfdfe3" }
                    _hover={
                      !scrolledToTop || inDrawer
                        ? { backgroundColor: "#c8c8d0" }
                        : { backgroundColor: "#434d56" }
                    }
                  >
                    <Text>Connect to lab</Text>
                  </Button>
                </Link>
              </HStack>
              
            ) : !loggedInTeam.lab.labInfo.isVpn &&
              eventInfo.teamSize !== 1 ? (
              <MultipleVmConnectBotton inDrawer={inDrawer}/>
            ) : loggedInTeam.lab.labInfo.isVpn && eventInfo.teamSize === 1 ? (
              <Button
                onClick={() => DownloadWgConfig(0)}
                backgroundColor={!scrolledToTop || inDrawer ? "#dfdfe3" : "#54616e"}
                color={!scrolledToTop || inDrawer ? "#54616e": "#dfdfe3" }
                _hover={
                  !scrolledToTop || inDrawer
                    ? { backgroundColor: "#c8c8d0" }
                    : { backgroundColor: "#434d56" }
                }
                isLoading={vpnDownloadStatus === "idle" ? false : true}
              >
                Download VPN config
              </Button>
            ) : loggedInTeam.lab.labInfo.isVpn && eventInfo.teamSize !== 1 && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaChevronDown />}
                  backgroundColor={!scrolledToTop || inDrawer ? "#dfdfe3" : "#54616e"}
                  color={!scrolledToTop || inDrawer ? "#54616e": "#dfdfe3" }
                  _hover={
                    !scrolledToTop || inDrawer
                      ? { backgroundColor: "#c8c8d0" }
                      : { backgroundColor: "#434d56" }
                  }
                >
                  <Text>Download VPN config</Text>
                </MenuButton>
                <MenuList>
                    {<RenderVpnConfButtons />}
                </MenuList>
              </Menu>
            )}
            <IconButton 
                  icon={<MdClose fontSize="18px"/>}
                  id={"close-lab"}
                  backgroundColor={"#bf3d3d"}
                  color={"#dfdfe3" }
                  _hover={
                    !scrolledToTop || inDrawer
                      ? { backgroundColor: "#c8c8d0" }
                      : { backgroundColor: "#434d56" }
                  }
                  marginLeft="10px"
                  variant="solid"
                  onClick={() => openCloseLabAlertDialog()}
                  isLoading={isCloseLabLoading}
                  isDisabled={isCloseLabLoading}
            />
            <Tooltip 
              anchorId={"close-lab"}
              content={"Close lab"}
              place="bottom"
            />
          </>
        ) : (
          <>
            {eventInfo.isMaxLabsReached && loggedInTeam.status === "idle" ? (
              <>
                <Box id="maxlabsbutton">
                  <Button isDisabled >Max labs reached</Button>
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
                    <Button 
                      onClick={configureBrowserLab}
                      backgroundColor={!scrolledToTop || inDrawer ? "#dfdfe3" : "#54616e"}
                      color={!scrolledToTop || inDrawer ? "#54616e": "#dfdfe3" }
                      _hover={
                        !scrolledToTop || inDrawer
                          ? { backgroundColor: "#c8c8d0" }
                          : { backgroundColor: "#434d56" }
                      }
                      isLoading={loggedInTeam.status === "inLabQueue" || loggedInTeam.status === "waitingForLab" ? true : false}
                    >
                      Get a lab
                    </Button>
                  </Box>
                ) : (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<FaChevronDown />}
                      backgroundColor={!scrolledToTop || inDrawer ? "#dfdfe3" : "#54616e"}
                      color={!scrolledToTop || inDrawer ? "#54616e": "#dfdfe3" }
                      _hover={
                        !scrolledToTop || inDrawer
                          ? { backgroundColor: "#c8c8d0" }
                          : { backgroundColor: "#434d56" }
                      }
                      isLoading={loggedInTeam.status === "inLabQueue" || loggedInTeam.status === "waitingForLab" ? true : false}
                    >
                      <Text>Get a lab</Text>
                    </MenuButton>
                    <MenuList>
                      <Link id="vpn-lab-button" color="black" _hover={{ textDecor: "none" }}>
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
                        color="black"
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
                {(loggedInTeam.status === "inLabQueue" || loggedInTeam.status === "waitingForLab") && (
                  <>
                    <IconButton 
                      icon={<MdClose fontSize="18px"/>}
                      id={"cancel-lab-queue"}
                      backgroundColor={"#bf3d3d"}
                      color={"#dfdfe3" }
                      _hover={
                        !scrolledToTop || inDrawer
                          ? { backgroundColor: "#c8c8d0" }
                          : { backgroundColor: "#434d56" }
                      }
                      marginLeft="10px"
                      variant="solid"
                      onClick={() => openCancelLabQueueAlertDialog()}
                      isLoading={isCancelLabQueueLoading}
                      isDisabled={isCancelLabQueueLoading}
                    />
                    <Tooltip 
                      anchorId={"cancel-lab-queue"}
                      content={"Cancel waiting for a lab"}
                      place="bottom"
                    />
                  </>
                )}
                
              </>
            )}
          </>
        )}
        <AlertDialogResetVm
          vmName="VM"
          isOpen={isResetLabAlertOpen}
          onClose={onResetLabAlertClose}
          cancelRef={cancelRef}
          resetVm={vmReset}
        />
        <CloseLabAlertDialog
          isOpen={isCloseLabAlertOpen}
          onClose={onCloseLabAlertClose}
          cancelRef={closeRef}
          closeLab={CloseLab}
        />
        <CancelLabQueueAlertDialog
          isOpen={isCancelLabQueueAlertOpen}
          onClose={onCancelLabQueueAlertClose}
          cancelRef={cancelLabQueueRef}
          cancelLabQueue={CancelLabQueue}
        />
      </Flex>
    </>
  );
}
