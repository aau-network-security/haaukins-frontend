import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertDescription,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Logo from "../components/Logo";
import { useSelector, useDispatch } from "react-redux";
import { loginTeam } from "../features/teams/teamSlice";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function LoginPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.team.loggedIn);
  const eventinfo = useSelector((state) => state.event.eventinfo);
  const error = useSelector((state) => state.team.error);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  

  const [reqDataState, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...reqDataState, ["eventTag"]: eventinfo.tag });
    
    let reqData = {
      username: reqDataState.username,
      password: reqDataState.password,
      eventTag: eventinfo.tag
    }
    dispatch(loginTeam(reqData));
  };

  const changeHandler = (e) => {
    if (e.target.name === "username") {
      setData({ ...reqDataState, [e.target.name]: e.target.value.trim() });
    } else {
      setData({ ...reqDataState, [e.target.name]: e.target.value });
    }
    console.log("reqData", reqDataState)
  };

  if (loggedIn) {
    return <Navigate to="/challenges" />;
  }
  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="85vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Logo white="false" marginBottom="10px"></Logo>
        <Text
          marginBottom="10px"
          fontSize="30px"
          fontWeight="bold"
          color="#211a52"
        >
          Login
        </Text>
        {error.apiStatusCode === 401 ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Incorrect username or password</AlertDescription>
          </Alert>
        ) : error.axiosCode === "ERR_NETWORK" ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              Error connecting to daemon. Please contact an administrator
            </AlertDescription>
          </Alert>
        ) : null}
        
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={changeHandler}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={changeHandler}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                backgroundColor="#211a52"
                color="white"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
